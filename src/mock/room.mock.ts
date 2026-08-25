// mock/room.ts
import Mock from 'mockjs';

function generateRooms() {
  const rooms = [];
  // 10张不同户型占位图，seed分别为 hx01~hx10，尺寸800*600
  const houseImages = [
    'https://picsum.photos/seed/hx01/800/600',
    'https://picsum.photos/seed/hx02/800/600',
    'https://picsum.photos/seed/hx03/800/600',
    'https://picsum.photos/seed/hx04/800/600',
    'https://picsum.photos/seed/hx05/800/600',
    'https://picsum.photos/seed/hx06/800/600',
    'https://picsum.photos/seed/hx07/800/600',
    'https://picsum.photos/seed/hx08/800/600',
    'https://picsum.photos/seed/hx09/800/600',
    'https://picsum.photos/seed/hx10/800/600',
  ];

  for (let i = 0; i < 50; i++) {
    const floor = 1 + Math.floor(i / 6); // 每6个房间一层
    const roomNumber = floor * 100 + (101 + (i % 6)); // 计算房间号
    rooms.push({
      roomNumber,
      decorationType: Mock.Random.pick(['毛坯', '精装']),
      area: Mock.Random.integer(70, 300),
      unitPrice: Mock.Random.integer(1, 3),
      src: Mock.Random.pick(houseImages),
    });
  }
  return rooms;
}

export default [
  {
    url: '/api/roomList',
    method: 'post',
    response: (req: any) => {
      const body = req.body;
      console.log('收到房间id', body.roomid);

      return {
        code: 200,
        message: '成功',
        data: {
          rooms: generateRooms(),
        },
      };
    },
  },
];
