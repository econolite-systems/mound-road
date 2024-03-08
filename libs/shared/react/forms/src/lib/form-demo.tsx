// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { FormInputDate } from './components/form-input-date';
import { FormInputDropdown } from './components/form-input-dropdown';
import { FormInputRadio } from './components/form-input-radio';
import { FormInputSlider } from './components/form-input-slider';
import FormInputText from './components/form-input-text';

interface IFormInput {
  textValue: string;
  radioValue: string;
  dateValue: Date;
  dropdownValue: string;
  sliderValue: number;
}

const defaultValues = {
  textValue: "Test",
  radioValue: "",
  dateValue: new Date(),
  dropdownValue: "",
  sliderValue: 25,
};
export const FormDemo = () => {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 10px",
      }}
    >
      <Typography variant="h6"> Form Demo</Typography>

      <FormInputText name="textValue" control={control} label="Text Input" />
      <FormInputRadio
        name={"radioValue"}
        control={control}
        label={"Radio Input"}
        options= {[{label: "Test", value: "1"}]}
      />
      <FormInputDropdown
        name="dropdownValue"
        control={control}
        label="Dropdown Input"
        options= {[{label: "Test", value: "1"}]}
      />
      <FormInputDate name="dateValue" control={control} label="Date Input" />
      <FormInputSlider
        name="sliderValue"
        control={control}
        setValue={setValue}
        label={"Slider Input"}
        min={1}
        max={50}
      />

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        {" "}
        Submit{" "}
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        {" "}
        Reset{" "}
      </Button>
    </Paper>
  );
};

export default FormDemo;
