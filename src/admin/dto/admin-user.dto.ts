// admin-user.dto.ts
export class AdminAlbumDto {
  id: string;
  title: string;
  description?: string;
  prices: { size: string; price: number }[];
  priceDigital: number;
  priceSchoolSports?: number;
  eventDate: string;
  photos: { id: string; url: string }[];
}

export class AdminUserDto {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'photographer' | 'SUPER_ADMIN';
  accessibleAlbums?: AdminAlbumDto[];
}
