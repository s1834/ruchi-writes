import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "@/app/api-docs/react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return <ReactSwagger spec={spec} />;
}
