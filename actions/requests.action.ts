'use server';

import { prisma } from '@/lib/prisma';

export type RequestRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  imageUrl: string | null;
  imageName: string | null;
  received: string;
  replied: boolean;
};

export async function getRequests(): Promise<RequestRow[]> {
  const requests = await prisma.contactRequest.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      message: true,
      imageUrl: true,
      imageName: true,
      createdAt: true,
      replied: true,
    },
  });

  return requests.map((request) => ({
    id: request.id,
    name: request.name,
    email: request.email,
    phone: request.phone,
    message: request.message,
    imageUrl: request.imageUrl,
    imageName: request.imageName,
    received: new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(request.createdAt),
    replied: request.replied,
  }));
}

export async function updateRequestReplied(
  id: string,
  replied: boolean,
) {
  await prisma.contactRequest.update({
    where: {
      id,
    },
    data: {
      replied,
    },
  });

  return {
    success: true,
  };
}