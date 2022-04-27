import { useState } from "react";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import client from "@/utils/apollo-client";
import Link from "next/link";

type ArtboardProps = {
  artboard: any;
  errors: string;
};

type Direction = "forward" | "backwards";

//TODO image error and placeholder
const Artboard = (props: ArtboardProps) => {
  const router = useRouter();
  // start current image at 1 for easier ui management, remember to shift when accesing the files array
  const [currentImage, setCurrentImage] = useState(1);
  const { artboard, errors } = props;
  if (!errors && !artboard) return <h1>There was an error</h1>;

  const navigateImages = (direction: Direction) => {
    setCurrentImage(
      direction === "forward" ? currentImage + 1 : currentImage - 1
    );
  };

  const { url, width, height } = artboard.files[currentImage - 1];
  return (
    <div>
      <div className="h-16 p-3 flex gap-3 items-center text-gray-400 shadow-md mb-[2px]">
        <Link href={`/document/${router.query.documentId}`}>
          <a>
            <Image
              src="/close.svg"
              height={8}
              width={8}
              onClick={() => router.back()}
            />
          </a>
        </Link>
        <img src="/separator.svg" alt="separator" />
        <img
          src="/arrow-left.svg"
          alt="previous item"
          onClick={() => {
            if (currentImage !== 0) navigateImages("backwards");
          }}
          className="cursor-pointer"
        />
        <span>{`${currentImage} / ${artboard.files.length}`}</span>
        <img
          src="/arrow-right.svg"
          alt="next item"
          onClick={() => {
            if (currentImage < artboard.files.length) navigateImages("forward");
          }}
          className="cursor-pointer"
        />
        <span className="text-gray-700 font-bold absolute w-full text-center -z-10">
          {artboard.name}
        </span>
      </div>
      <div className="max-h-full relative h-[calc(100vh_-_4rem_-_1rem)] bg-gray-100 mt-4">
        <Image
          src={url}
          width={width}
          height={height}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  try {
    const { data, errors } = await client.query({
      query: gql`
              query Artboard {
                artboard(shareIdentifier: "${params?.documentId}", shortId: "${params?.artboardId}") {
                    name
                    identifier
                    files {
                      url
                      height
                      width
                      scale
                      identifier
                    }
                  }
              }
            `,
    });

    return {
      props: {
        artboard: data.artboard,
        error: JSON.stringify(errors) || null,
      },
    };
  } catch (error) {
    return {
      props: {
        artboard: null,
        error: JSON.stringify(error) || null,
      },
    };
  }
};

export default Artboard;
