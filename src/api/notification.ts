import api from '../api/axiosInstance';

export type NotificationForm = {
  name: string;
  time: string;
};

// 알림 생성
export const createNotification = async (data: NotificationForm) => {
  const res = await api.post('/api/notifications', data);
  return res.data;
};

// 알림 전체 조회
export const getNotifications = async () => {
  const res = await api.get('/api/notifications');
  return res.data;
};

// 단일 알림 조회
export const getNotification = async (id: number) => {
  const res = await api.get(`/api/notifications/${id}`);
  return res.data;
};

// 알림 수정
export const updateNotification = async (id: number, data: NotificationForm) => {
  const res = await api.put(`/api/notifications/${id}`, data);
  return res.data;
};

// 알림 삭제
export const deleteNotification = async (id: number) => {
  const res = await api.delete(`/api/notifications/${id}`);
  return res.data;
};
