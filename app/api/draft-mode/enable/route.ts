import { createClient } from "next-sanity";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/lib/cms/projeto-sanity";
import { tokenDeLeitura } from "@/lib/cms/sanity";

export async function GET(request: Request) {
  if (!sanityProjectId || !tokenDeLeitura) {
    return new Response(
      "Pré-visualização desligada: falta SANITY_API_READ_TOKEN no servidor.",
      { status: 501 },
    );
  }
  const client = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
    token: tokenDeLeitura,
  });
  return defineEnableDraftMode({ client }).GET(request);
}
