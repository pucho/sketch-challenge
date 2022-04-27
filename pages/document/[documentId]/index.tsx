import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import client from "@/utils/apollo-client";

type DocumentProps = {
  document: any;
  errors: string;
};

// TODO Add types for Share from gql schema?
// TODO Main container?
const Document = (props: DocumentProps) => {
  const router = useRouter();
  const { document, errors } = props;

  if (!errors && !document) return <h1>There was an error</h1>;

  const {
    name,
    artboards: { entries },
  } = document;
  return (
    <div>
      <div className="h-16 p-3 flex gap-3 items-center shadow-md mb-[2px]">
        <Link href="/">
          <a className="flex items-center cursor-pointer">
            <Image src="/sketch-logo.svg" height={24} width={24} />
          </a>
        </Link>
        {name}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-x-7 gap-y-4 p-5 bg-gray-100 text-gray-500">
        {entries.map((artboard: any, index: number) => {
          return (
            <Link
              href={`/document/${router.query.documentId}/${artboard.shortId}`}
            >
              <div
                className="flex flex-col text-center gap-3 cursor-pointer"
                key={`${name}-${index}`}
              >
                <img
                  src={artboard.files[0].url}
                  alt={`Image of ${artboard.name}`}
                  className="object-contain flex-grow"
                />

                <a>{artboard.name}</a>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  try {
    const { data, errors } = await client.query({
      query: gql`
            query Document {
                share(id: "${params?.documentId}") {
                    identifier
                    version {
                      document {
                        name
                        artboards {
                          entries {
                            isArtboard
                            name
                            shortId
                            files {
                              url
                              height
                              width
                              scale
                              thumbnails {
                                url
                                height
                                width
                              }
                            }
                          }
                        }
                      }
                    }
                  }
            }
          `,
    });
    return {
      props: {
        document: data.share.version.document,
        error: JSON.stringify(errors) || null,
      },
    };
  } catch (error) {
    return {
      props: {
        document: null,
        error: JSON.stringify(error) || null,
      },
    };
  }
};

export default Document;
