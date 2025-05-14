import axios from 'axios';
import { PillDetail } from '../types/pill';

const API_BASE_URL = 'http://3.37.55.31:8080/api';

/**
 * 의약품 검색 API
 * @param name 검색할 의약품 이름
 * @param type 의약품 종류 (ALL | ETC | OTC)
 * @returns 의약품 리스트
 */

export const searchPills = async (name: string, type: string = 'ALL') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/medicines`, {
      params: { name, type },
    });

    return response.data.data; 
  } catch (err) {
    console.error('의약품 검색 에러:', err);
    return [];
  }
};

export const getPillDetail = async (id: number): Promise<PillDetail> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medicines/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('약품 상세 조회 실패:', error);
      throw error;
    }
  };

// 병용금기 조회 API
export const checkPillInteraction = async (id1: number, id2: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/medicines/interactions`, {
      params: { id1, id2 },
    });

    return response.data.data; 
  } catch (error) {
    console.error('병용금기 조회 실패:', error);
    throw error;
  }
};