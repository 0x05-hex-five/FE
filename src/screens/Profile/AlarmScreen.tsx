import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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

const TimePickerButton = styled.TouchableOpacity`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TimeText = styled.Text`
  font-size: 13px;
  color: #1f2937;
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
  const [time, setTime] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [allEnabled, setAllEnabled] = useState(true);
  const [pillAlarmEnabled, setPillAlarmEnabled] = useState(true);

  const formatTime = (date: Date) =>
    `${date.getHours().toString().padStart(2, '0')}시 ${date.getMinutes().toString().padStart(2, '0')}분`;

  const formatApiTime = (date: Date) =>
    `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

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
    const payload = {
      name: alarmName,
      time: formatApiTime(time),
    };

    try {
      if (editMode && editingId !== null) {
        await updateNotification(editingId, payload);
      } else {
        await createNotification(payload);
      }

      setAlarmName('');
      setTime(new Date());
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
      const [hour, minute] = alarm.time.split(':');
      setTime(new Date(0, 0, 0, Number(hour), Number(minute)));

      setEditingId(id);
      setEditMode(true);
      setShowForm(true);
    } catch (err) {
      console.error('단일 알림 조회 실패:', err);
    }
  };

  return (
    <Container>
      <Content>
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
                placeholder="알림명(복용할 약 이름)을 입력하세요"
                placeholderTextColor="#9ca3af"
                value={alarmName}
                onChangeText={setAlarmName}
              />

              <Label>복용 시간</Label>
              <TimePickerButton onPress={() => setShowTimePicker(true)}>
                <TimeText>{formatTime(time)}</TimeText>
                <Ionicons name="time-outline" size={18} color="#9ca3af" />
              </TimePickerButton>

              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  value={time}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) setTime(selectedTime);
                  }}
                />
              )}

              <ButtonRow>
                <CancelBtn
                  onPress={() => {
                    setShowForm(false);
                    setAlarmName('');
                    setEditMode(false);
                    setEditingId(null);
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
