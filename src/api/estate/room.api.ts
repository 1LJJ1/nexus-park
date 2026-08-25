import request from '../index';
export interface RoomItem {
  roomNumber: number;
  decorationType: '毛坯' | '精装';
  area: number;
  unitPrice: number;
  src: string;
}

interface RoomListResp {
  rooms: RoomItem[];
}
// 获取房间列表

export const getRoomListAPI = () => {
  return request<ResponseData<RoomListResp>>({
    url: '/roomList',
    method: 'post',
  });
};
