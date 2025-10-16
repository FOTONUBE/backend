export class OrderItemResponseDto {
  id: string;
  size: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  photo: {
    id: string;
    url: string;
  };
}

export class AlbumSummaryDto {
  id: string;
  title: string;
  prices: { size: string; price: number }[];
  priceDigital: number;
  priceSchoolSports?: number;
  eventDate: string;
  description: string;
}

export class OrderResponseDto {
  id: string;
  album: AlbumSummaryDto;
  items: OrderItemResponseDto[];
  total: number;
  status: string;
  createdAt: Date;
}
