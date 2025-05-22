import React, { useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../components/UI/BottomTabBar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'; 

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
  position: absolute;
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
  margin-bottom: 12px;
`;

const ButtonText = styled.Text`
  color: #1f2937;
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

const InfoButton = styled.TouchableOpacity`
  background-color: rgb(22, 183, 129);
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
      { mediaType: 'photo', saveToPhotos: true },
      (response) => {
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setImageUri(uri);
        }
      }
    );
  };

  const handleGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      const uri = response.assets?.[0]?.uri;
      if (uri) {
        setImageUri(uri);
      }
    });
  };

const handleJustSend = async () => {
  if (!imageUri) {
    Alert.alert('에러', 'imageUri가 없습니다');
    return;
  }

  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    name: 'upload.jpg',
    type: 'image/jpeg',
  } as any);

  try {
    const res = await fetch('http://3.37.55.31:8080/api/ai/recognitions', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = await res.json();
    console.log('서버 응답:', result);
    navigation.navigate('SimilarPillScreen', { imageUri });
  } catch (err) {
    console.error('전송 실패:', err);
    Alert.alert('업로드 실패');
  }
};

const handleCrop = async () => {
  if (!imageUri) {
    Alert.alert('에러', '자를 이미지가 없습니다');
    return;
  }

  try {
    const cropped = await ImagePicker.openCropper({
      path: imageUri,
      width: 300, // 원하는 크기로 설정
      height: 300,
      cropping: true,
      mediaType: 'photo',
    });

    setImageUri(cropped.path); // 잘린 이미지로 대체
    console.log('잘린 이미지 경로:', cropped.path);
  } catch (err) {
    console.error('자르기 실패:', err);
    Alert.alert('이미지 자르기 실패', '이미지를 자르는데 문제가 발생했습니다.');
  }
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
        <>
              <OutlineButton onPress={handleCrop}>
      <Ionicons name="crop" size={20} color="#1f2937" />
      <ButtonText>이미지 자르기</ButtonText>
    </OutlineButton>

          <InfoButton onPress={handleJustSend}>
            <InfoButtonText>해당 약품 정보 알아보기</InfoButtonText>
          </InfoButton>
        </>
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
