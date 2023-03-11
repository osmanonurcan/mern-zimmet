import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { addTicket, getDevices, updateDevice } from "../../axios";
import { AddImage } from "./AddImage";
import {
  ModalChildContainer,
  ScrollableContainer,
  FieldContainer,
  ButtonContainer,
  CategorySelect,
  ModalInput,
  ModalTextArea,
} from "./styles/ModalChild";
import Select from "react-select";
import { useTheme } from "styled-components";
import { LoadingContainer } from "../components/styles/LoadingContainer";
import { RotatingLines } from "react-loader-spinner";

export const AddService = ({
  closeModal,
  devices,

  clickedDeviceId,

  device,
  // device = {
  //   make: "",
  //   model: "",
  //   category: "",
  //   owner: "",
  //   specs: [],
  // },
}) => {
  const [specFields, setSpecFields] = useState([]);
  const description = useRef();
  const theme = useTheme();
  // const components = devices.filter((device) => device.category === "Component")

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  useEffect(() => {
    setSpecFields(device?.specs);
  }, [devices, clickedDeviceId]);

  const handleFormChange = (event, index) => {
    let data = [...specFields];
    data[index][event.target.name] = event.target.value;
    setSpecFields(data);
  };

  const submit = async (e) => {
    e.preventDefault();

    const ticket = {
      description: description.current?.value,
      status: "pending",
      oldSpecs: device.specs,
      newSpecs: specFields,
    };

    const res = await addTicket(clickedDeviceId, ticket);

    closeModal();
  };

  const addFields = (e) => {
    e.preventDefault();
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

  if (specFields == null) {
    return (
      <LoadingContainer>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </LoadingContainer>
    );
  }

  return (
    <ModalChildContainer>
      <ScrollableContainer>
        <form>
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
                  <option value="RAM">RAM</option>
                  <option value="SSD">SSD</option>
                  <option value="HDD">HDD</option>
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
          <ButtonContainer onClick={addFields}>Add Spec..</ButtonContainer>

          <h3>Description</h3>
          <ModalTextArea name="description" type="text" ref={description} />

          {/* <h3>Components to be used </h3>
          <Select
            //defaultValue={[options[2], options[3]]}

            isMulti
            isSearchable
            name="components"
            options={options}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: theme.body,
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: theme.body,
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? theme.card : theme.body,
              }),
            }}
            classNamePrefix="select"
            //menuPlacement="fixed"
          /> */}
        </form>
      </ScrollableContainer>
      <ButtonContainer onClick={submit}>ADD TO SERVICE</ButtonContainer>
    </ModalChildContainer>
  );
};
