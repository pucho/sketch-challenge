import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Image from "next/image";

import client from "../../apollo-client";

type DocumentProps = {
  document: any;
  errors: string;
};

// TODO Add types for Share from gql schema
const Document = (props: DocumentProps) => {
  const { document, errors } = props;

  if (!errors && !document) return <h1>There was an error</h1>;

  const {
    name,
    artboards: { entries },
  } = document;
  // TODO define artboard component
  return (
    <div>
      <div className="h-16 p-3 flex gap-3 items-center">
        <Image src="/sketch-logo.svg" height={24} width={24} />
        {name}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-x-7 gap-y-4">
        {entries.map((artboard: any, index: number) => {
          return (
            <div
              className="flex flex-col text-center gap-3"
              key={`${name}-${index}`}
            >
              <img
                src={artboard.files[0].url}
                alt={`Image of ${artboard.name}`}
                className="object-contain flex-grow"
              />
              <span>{artboard.name}</span>
            </div>
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
                            name
                            isArtboard
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
