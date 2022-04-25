import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";

import client from "../../apollo-client";

// Add types for Share from gql schema
const Document = (props: any) => {
  const { document, errors } = props;

  if (errors && !document) return <h1>There was an error</h1>;

  return <div>{document.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  console.log(params);
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
    console.log("im erroring");
    return {
      props: {
        document: null,
        error: JSON.stringify(error),
      },
    };
  }
};

export default Document;
