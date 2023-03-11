import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getDeviceById } from "../../axios";

export const Detail = () => {
  const [device, setDevice] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchDevice = async () => {
      const deviceData = await getDeviceById(id);

      setDevice(deviceData?.data?.device || {});
    };
    fetchDevice();
  }, []);
  return (
    <div>
      <S.ImageContainer
        src={
          device.img ? `data:image/jpeg;base64,${device.img}` : "/laptopjpg.jpg"
        }
        alt="device"
      />
      <h2>{device.make}</h2>
      <h2>{device.model}</h2>
      <h2>{device.category}</h2>
      <h2>{device.owner}</h2>
      {device.specs?.map((spec, title) => {
        return (
          <p key={title}>
            {spec.title}: {spec.info}
          </p>
        );
      })}
    </div>
  );
};

// STYLED COMPONENTS

const S = {};

S.ImageContainer = styled.img`
  width: 100vw;
  max-height: 20rem;
  object-fit: contain;
`;
