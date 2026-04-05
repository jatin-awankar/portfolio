import { memo } from "react";
import { DottedMap } from "./ui/dotted-map";

const MemoizedMap = memo(() => {
  return (
    <DottedMap
      dotRadius={0.25}
      markers={[
        {
          lat: 21,
          lng: 78,
          pulse: true,
          size: 1.5,
          label: "India",
        },
      ]}
    />
  );
});

MemoizedMap.displayName = "MemoizedMap";

export default MemoizedMap;
