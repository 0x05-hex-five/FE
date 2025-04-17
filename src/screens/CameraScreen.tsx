import React, { useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../components/UI/BottomTabBar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const CameraBox = styled.View`
  height: 200px;
  background-color: #f3f4f6;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  overflow: hidden;
`;

const CameraText = styled.Text`
  color: #9ca3af;
  margin-top: 8px;
`;

const PreviewImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: #2563eb;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 12px;
`;

const OutlineButton = styled.TouchableOpacity`
  border: 1px solid #d1d5db;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #1f2937;
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

const InfoButton = styled.TouchableOpacity`
  margin-top: 12px;
  background-color:rgb(22, 183, 129);
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const InfoButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const NoticeBox = styled.View`
  margin-top: 24px;
  background-color: #f9fafb;
  padding: 12px;
  border-radius: 8px;
`;

const NoticeText = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
`;

const CameraScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: '카메라 권한 요청',
            message: '약 사진을 촬영하기 위해 카메라 접근 권한이 필요합니다.',
            buttonPositive: '확인',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('카메라 권한이 필요합니다');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('카메라 오류', response.errorMessage || '');
          return;
        }

        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setImageUri(uri);
          console.log('📷 카메라 사진 URI:', uri);
        }
      }
    );
  };

  const handleGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('갤러리 오류', response.errorMessage || '');
          return;
        }

        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setImageUri(uri);
          console.log('🖼 갤러리 사진 URI:', uri);
        }
      }
    );
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </BackButton>
        <Title>약 촬영</Title>
      </Header>

      <CameraBox>
        {imageUri ? (
          <PreviewImage source={{ uri: imageUri }} resizeMode="cover" />
        ) : (
          <>
            <Ionicons name="camera-outline" size={36} color="#9ca3af" />
            <CameraText>카메라를 켜서 약품을 촬영하세요</CameraText>
          </>
        )}
      </CameraBox>

      <PrimaryButton onPress={handleCamera}>
        <Ionicons name="camera" size={20} color="#fff" />
        <ButtonText style={{ color: '#fff' }}>카메라 켜기</ButtonText>
      </PrimaryButton>

      <OutlineButton onPress={handleGallery}>
        <Ionicons name="image-outline" size={20} color="#1f2937" />
        <ButtonText>갤러리에서 선택</ButtonText>
      </OutlineButton>

      {imageUri && (
        <InfoButton
          onPress={() => {
            navigation.navigate('SimilarPillScreen', { imageUri });
          }}
        >
          <InfoButtonText>해당 약품 정보 알아보기</InfoButtonText>
        </InfoButton>
      )}

      <NoticeBox>
        <NoticeText>• 약품이 이동이 잘 보이도록 촬영해주세요</NoticeText>
        <NoticeText>• 밝은 곳에서 촬영하면 더 정확한 인식이 가능합니다</NoticeText>
        <NoticeText>• 여러 약품을 한번에 촬영할 경우 간격을 두고 촬영해주세요</NoticeText>
      </NoticeBox>

      <BottomTabBar />
    </Container>
  );
};

export default CameraScreen;
