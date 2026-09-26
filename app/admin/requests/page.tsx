import { getRequests } from '@/actions/requests.action';
import RequestsClient from '@/components/admin/requests/request-client';

export default async function AdminRequestsPage() {
  const requests = await getRequests();

  return <RequestsClient initialRequests={requests} />;
}