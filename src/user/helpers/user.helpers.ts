import { User } from '../entities/user.entity';
import { Album } from 'src/album/entities/album.entity';

export const UserHelpers = {
  getActiveSubscription(user: User) {
    if (!user.subscriptions?.length) return null;
    // Encuentra la suscripción activa (endDate === null)
    return user.subscriptions.find((sub) => sub.endDate === null) ?? null;
  },

  getMaxAlbums(user: User): number {
    if (user.role !== 'photographer') return 0;

    const activeSub = UserHelpers.getActiveSubscription(user);
    const planName = activeSub?.plan?.name ?? 'Free';

    switch (planName) {
      case 'Mensual':
      case 'Trimestral':
      case 'Semestral':
        return 10; // cualquier plan pago
      case 'Free':
      default:
        return 1;
    }
  },

  canCreateAlbum(user: User): boolean {
    if (user.role !== 'photographer') return false;
    return (user.albums?.length || 0) < UserHelpers.getMaxAlbums(user);
  },

  getMaxStorageMb(user: User): number {
    if (user.role !== 'photographer') return 20;

    const activeSub = UserHelpers.getActiveSubscription(user);
    const planName = activeSub?.plan?.name ?? 'Free';

    switch (planName) {
      case 'Mensual':
      case 'Trimestral':
      case 'Semestral':
        return 20 * 1024; // 20 GB
      case 'Free':
      default:
        return 1024; // 1 GB
    }
  },

  canUpload(user: User, mb: number): boolean {
    const maxStorage = UserHelpers.getMaxStorageMb(user);
    return (user.storageUsedMb ?? 0) + mb <= maxStorage;
  },

  // Límite de fotos por álbum
  getMaxPhotosPerAlbum(user: User): number {
    if (user.role !== 'photographer') return 0;

    const activeSub = UserHelpers.getActiveSubscription(user);
    const planName = activeSub?.plan?.name ?? 'Free';

    switch (planName) {
      case 'Mensual':
      case 'Trimestral':
      case 'Semestral':
        return 400;
      case 'Free':
      default:
        return 200;
    }
  },

  canUploadPhotoToAlbum(user: User, album: Album): boolean {
    if (user.role !== 'photographer') return false;
    return (album.photos?.length || 0) < UserHelpers.getMaxPhotosPerAlbum(user);
  },
};
