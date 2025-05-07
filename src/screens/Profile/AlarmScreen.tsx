import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabBar from '../../components/UI/BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
} from '../../api/notification';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: 24px 16px 100px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const BackButton = styled(TouchableOpacity)`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
`;

const Section = styled.View`
  margin-bottom: 24px;
`;

const SectionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SectionTitle = styled.Text`
  font-size: 14px;
  color: #1f2937;
`;

const Toggle = styled.Switch``;

const AlarmCard = styled.View`
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

const AlarmHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AlarmText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #1f2937;
`;

const AlarmSub = styled.Text`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #3182ce;
  padding: 14px;
  align-items: center;
  border-radius: 8px;
  margin-top: 12px;
`;

const AddText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

const AddAlarmCard = styled.View`
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
`;

const Label = styled.Text`
  font-size: 13px;
  color: #374151;
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #1f2937;
`;

const TimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TimeInputWrapper = styled.View`
  flex: 1;
  margin-right: 8px;
`;

const TimeInput = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  color: #1f2937;
  margin-bottom: 12px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CancelBtn = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  align-items: center;
  border-radius: 8px;
  background-color: #e5e7eb;
  margin-right: 8px;
`;

const SaveBtn = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  align-items: center;
  border-radius: 8px;
  background-color: #3182ce;
`;

const BtnText = styled.Text`
  font-size: 13px;
  color: #fff;
  font-weight: bold;
`;

const AlarmScreen = () => {
  const navigation = useNavigation();

  const [alarms, setAlarms] = useState<{ id: number; name: string; time: string }[]>([]);
  const [alarmName, setAlarmName] = useState('');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [allEnabled, setAllEnabled] = useState(true);
  const [pillAlarmEnabled, setPillAlarmEnabled] = useState(true);

  const formatApiTime = () =>
    `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;

  const fetchAlarms = async () => {
    try {
      const res = await getNotifications();
      setAlarms(res.data);
    } catch (err) {
      console.error('알림 목록 조회 실패:', err);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  const handleSaveAlarm = async () => {
    if (
      isNaN(Number(hour)) || isNaN(Number(minute)) ||
      Number(hour) < 0 || Number(hour) > 23 ||
      Number(minute) < 0 || Number(minute) > 59
    ) {
      Alert.alert('시간 오류', '시간은 0~23, 분은 0~59 사이여야 합니다.');
      return;
    }

    const payload = {
      name: alarmName,
      time: formatApiTime(),
    };

    try {
      if (editMode && editingId !== null) {
        await updateNotification(editingId, payload);
      } else {
        await createNotification(payload);
      }

      setAlarmName('');
      setHour('00');
      setMinute('00');
      setShowForm(false);
      setEditMode(false);
      setEditingId(null);
      fetchAlarms();
    } catch (err) {
      console.error('알림 저장 실패:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNotification(id);
      fetchAlarms();
    } catch (err) {
      console.error('알림 삭제 실패:', err);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const res = await getNotification(id);
      const alarm = res.data;

      setAlarmName(alarm.name);
      const [hourStr, minuteStr] = alarm.time.split(':');
      setHour(hourStr);
      setMinute(minuteStr);

      setEditingId(id);
      setEditMode(true);
      setShowForm(true);
    } catch (err) {
      console.error('단일 알림 조회 실패:', err);
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={{ paddingBottom: 80 }}>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#1f2937" />
          </BackButton>
          <Title>알림 설정</Title>
        </Header>

        <Section>
          <SectionRow>
            <SectionTitle>모든 알림</SectionTitle>
            <Toggle value={allEnabled} onValueChange={setAllEnabled} />
          </SectionRow>

          <SectionRow>
            <SectionTitle>약품 복용 시간 알림</SectionTitle>
            <Toggle value={pillAlarmEnabled} onValueChange={setPillAlarmEnabled} />
          </SectionRow>
        </Section>

        <Section>
          <SectionTitle>알림 시간 설정</SectionTitle>

          {alarms.map((item) => (
            <AlarmCard key={item.id}>
              <AlarmHeader>
                <AlarmText>{item.name}</AlarmText>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash-outline" size={18} color="#9ca3af" />
                </TouchableOpacity>
              </AlarmHeader>
              <AlarmSub>{item.time}</AlarmSub>

              <TouchableOpacity onPress={() => handleEdit(item.id)} style={{ marginTop: 6 }}>
                <AlarmSub style={{ color: '#3182ce' }}>수정하기</AlarmSub>
              </TouchableOpacity>
            </AlarmCard>
          ))}

          {showForm ? (
            <AddAlarmCard>
              <Label>알림명</Label>
              <Input
                placeholder="알림명(복용할 약 이름)"
                placeholderTextColor="#9ca3af"
                value={alarmName}
                onChangeText={setAlarmName}
              />

              <Label>복용 시간</Label>
              <TimeRow>
                <TimeInputWrapper>
                  <Label>시 (0~23)</Label>
                  <TimeInput
                    placeholder="시"
                    value={hour}
                    keyboardType="number-pad"
                    onChangeText={(text) => setHour(text.replace(/[^0-9]/g, ''))}
                  />
                </TimeInputWrapper>
                <TimeInputWrapper style={{ marginRight: 0 }}>
                  <Label>분 (0~59)</Label>
                  <TimeInput
                    placeholder="분"
                    value={minute}
                    keyboardType="number-pad"
                    onChangeText={(text) => setMinute(text.replace(/[^0-9]/g, ''))}
                  />
                </TimeInputWrapper>
              </TimeRow>

              <ButtonRow>
                <CancelBtn
                  onPress={() => {
                    setShowForm(false);
                    setAlarmName('');
                    setEditMode(false);
                    setEditingId(null);
                    setHour('00');
                    setMinute('00');
                  }}
                >
                  <BtnText style={{ color: '#1f2937' }}>취소</BtnText>
                </CancelBtn>
                <SaveBtn onPress={handleSaveAlarm}>
                  <BtnText>{editMode ? '수정' : '저장'}</BtnText>
                </SaveBtn>
              </ButtonRow>
            </AddAlarmCard>
          ) : (
            <AddButton onPress={() => setShowForm(true)}>
              <AddText>+ 알림 추가</AddText>
            </AddButton>
          )}
        </Section>
      </Content>

      <BottomTabBar />
    </Container>
  );
};

export default AlarmScreen;
