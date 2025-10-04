// src/admin/dto/admin-album-by-id.dto.ts
export class AdminAlbumByIdDto {
  id: string;
  title: string;
  description: string;
  eventDate: Date;
  portada?: string;

  prices: { size: string; price: number }[];
  clientEmail: string;
  clientPhoneNumber: string;

  totalOrders: number;

  orders: {
    id: string;
    status: string;
    total: number;
    createdAt: Date;
  }[];
}
