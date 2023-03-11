import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getDevices, updateDevice } from "../../axios";
import { AddImage } from "./AddImage";
import {
  ModalChildContainer,
  ScrollableContainer,
  FieldContainer,
  ButtonContainer,
  CategorySelect,
  ModalInput,
} from "./styles/ModalChild";

export const UpdateDevice = ({
  closeModal,
  devices,
  clickedDeviceId,
  setDevices,
  isOwnerExists,
  device = {
    make: "",
    model: "",
    category: "",
    owner: "",
    specs: [],
  },
}) => {
  const [specFields, setSpecFields] = useState([]);
  const make = useRef();
  const model = useRef();
  const category = useRef();
  const owner = useRef();
  const [image, setImage] = useState("");

  useEffect(() => {
    setSpecFields(device.specs);
  }, [devices, clickedDeviceId]);

  const onImageChange = (image) => {
    setImage(image);
  };

  const handleFormChange = (event, index) => {
    let data = [...specFields];
    data[index][event.target.name] = event.target.value;
    setSpecFields(data);
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      make: make.current?.value,
      model: model.current?.value,
      category: category.current?.value,
      owner: owner.current?.value,
      specs: specFields,
    };

    if (image[0]?.file) {
      payload.image = image[0].file;
    }

    // CREATE DEVICE
    const device = await updateDevice(clickedDeviceId, payload);

    const devicesData = await getDevices(e.target.value, isOwnerExists);
    setDevices(devicesData?.data?.devices || []);

    closeModal();
  };

  const addFields = () => {
    let object = {
      title: "",
      info: "",
    };

    setSpecFields([...specFields, object]);
  };

  const removeFields = (index) => {
    let data = [...specFields];
    data.splice(index, 1);
    setSpecFields(data);
  };
  return (
    <ModalChildContainer>
      <ScrollableContainer>
        <AddImage {...{ image, onImageChange }} />
        <form>
          <h3>Make</h3>
          <ModalInput
            name="make"
            type="text"
            defaultValue={device.make}
            ref={make}
          />

          <h3>Model</h3>
          <ModalInput
            name="model"
            type="text"
            defaultValue={device.model}
            ref={model}
          />

          <h3>Category</h3>
          <CategorySelect
            name="category"
            ref={category}
            defaultValue={device.category}
          >
            <option disabled value="">
              {""}
            </option>
            <option value="Computer">Computer</option>
            <option value="Accessory">Accessory</option>
            <option value="Component">Component</option>

            <option value="Other">Other</option>
          </CategorySelect>
          <h3>Owner</h3>
          <ModalInput
            name="owner"
            type="text"
            ref={owner}
            defaultValue={device.owner}
          />

          <h3>Specs</h3>

          {specFields.map((spec, index) => {
            return (
              <FieldContainer key={index}>
                <CategorySelect
                  name="title"
                  onChange={(event) => handleFormChange(event, index)}
                  defaultValue={spec.title}
                >
                  <option disabled value="">
                    {""}
                  </option>
                  <option value="CPU">CPU</option>
                  <option value="GPU">GPU</option>
                  <option value="RAM">GPU</option>
                  <option value="SSD">GPU</option>
                  <option value="HDD">GPU</option>
                </CategorySelect>
                <ModalInput
                  name="info"
                  placeholder="Info"
                  onChange={(event) => handleFormChange(event, index)}
                  value={spec.info}
                />
                <ButtonContainer onClick={() => removeFields(index)}>
                  <AiOutlineClose />
                </ButtonContainer>
              </FieldContainer>
            );
          })}
        </form>
        <ButtonContainer onClick={addFields}>Add Spec..</ButtonContainer>
      </ScrollableContainer>
      <ButtonContainer onClick={submit}>UPDATE</ButtonContainer>
    </ModalChildContainer>
  );
};
