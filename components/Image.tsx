import Image from "next/image";
import * as React from "react";

type NextImageProps = React.ComponentProps<typeof Image>;

const NextImage: React.FC<NextImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  ...restProps
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      {...restProps}
    />
  );
};

export default NextImage;
