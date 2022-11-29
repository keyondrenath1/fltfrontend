import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Accordion from "./Accordion";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import Authentication from "../services/authentication";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
    padding: "20px 0 20px 18px",
    border: "1px solid black",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  createBtn: {
    backgroundColor: "green",
    color: "white",
    padding: 15,
    width: 150,
  },
}));

export default function CreatePropertyModal({
  tenants,
  open,
  handleClose,
  fetch,
}) {
  const classes = useStyles();

  const [streetAddressValue, setStreetAddressValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [postcodeValue, setPostcodeValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [floorsValue, setFloors] = useState("");
  const [bathroomsValue, setBathrooms] = useState("");
  const [bedroomsValue, setBedrooms] = useState("");
  const [propertyDescValue, setPropertyDesc] = useState("");

  const [patioChecked, setPatio] = useState(false);
  const [gardenChecked, setGarden] = useState(false);
  const [garageChecked, setGarage] = useState(false);
  const [storageChecked, setStorage] = useState(false);
  const [livingRoomChecked, setLivingroom] = useState(false);
  const [officeChecked, setOffice] = useState(false);
  const [fireplaceChecked, setFireplace] = useState(false);
  const [kitchenChecked, setKitchen] = useState(false);
  const [basementChecked, setBasement] = useState(false);
  const [loftChecked, setLoft] = useState(false);
  const [addedTenants, addTenants] = useState([])

  const addNewProperty = () => {
    const accountId = sessionStorage.getItem("id");
    debugger
    let emails = []
    addedTenants.map(t => {
      emails.push(t.email)
    })
    const payload = {
      emails: emails,
      landlordId: accountId,
      address: {
        streetAddress: streetAddressValue,
        city: cityValue,
        postCode: postcodeValue,
        country: countryValue,
      },
      propertyUnit: {
        patio: patioChecked,
        garden: gardenChecked,
        garage: garageChecked,
        storage: storageChecked,
        floors: floorsValue,
        livingRoom: livingRoomChecked,
        bathroom: bathroomsValue,
        bedroom: bedroomsValue,
        office: officeChecked,
        fireplace: fireplaceChecked,
        kitchen: kitchenChecked,
        basement: basementChecked,
        loft: loftChecked,
        propertyDescription: propertyDescValue,
      },
    };

    Authentication.createProperty(payload).then((res) => {
      handleClose();
    });
  };

  const addedTenantsHandler = (value) => {
    addTenants(value)
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant="h3" component="h1" className={classes.heading}>
            Add a new property
          </Typography>
          <Accordion
            tenants={tenants}
            addedTenants={(value) => addedTenantsHandler(value)}
            sectionTwo={
              <AddressForm
                streetAddressValue={streetAddressValue}
                cityValue={cityValue}
                postcodeValue={postcodeValue}
                countryValue={countryValue}
                streetAddressHandler={(value) => setStreetAddressValue(value)}
                cityHandler={(value) => setCityValue(value)}
                postcodeHandler={(value) => setPostcodeValue(value)}
                countryHandler={(value) => setCountryValue(value)}
              />
            }
            sectionThree={
              <PropertyUnitForm
                floorsValue={floorsValue}
                bathroomsValue={bathroomsValue}
                bedroomsValue={bedroomsValue}
                propertyDescValue={propertyDescValue}
                floorsHandler={(value) => setFloors(value)}
                bathroomsHandler={(value) => setBathrooms(value)}
                bedroomsHandler={(value) => setBedrooms(value)}
                propertyDescHandler={(value) => setPropertyDesc(value)}
                patioChecked={patioChecked}
                gardenChecked={gardenChecked}
                garageChecked={garageChecked}
                storageChecked={storageChecked}
                livingRoomChecked={livingRoomChecked}
                officeChecked={officeChecked}
                fireplaceChecked={fireplaceChecked}
                kitchenChecked={kitchenChecked}
                basementChecked={basementChecked}
                loftChecked={loftChecked}
                isCheckedPatio={(value) => setPatio(value)}
                isCheckedGarden={(value) => setGarden(value)}
                isCheckedGarage={(value) => setGarage(value)}
                isCheckedStorage={(value) => setStorage(value)}
                isCheckedLivingroom={(value) => setLivingroom(value)}
                isCheckedOffice={(value) => setOffice(value)}
                isCheckedFireplace={(value) => setFireplace(value)}
                isCheckedKitchen={(value) => setKitchen(value)}
                isCheckedBasement={(value) => setBasement(value)}
                isCheckedLoft={(value) => setLoft(value)}
              />
            }
          />
          <div
            style={{
              margin: 20,
            }}
          >
            <Button
              variant="contained"
              color="Green"
              classes={{
                root: classes.createBtn,
              }}
              onClick={addNewProperty}
            >
              Create
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

const AddressForm = ({
  streetAddressValue,
  streetAddressHandler,
  cityValue,
  cityHandler,
  postcodeValue,
  postcodeHandler,
  countryValue,
  countryHandler,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Input
        label="Street Address"
        value={streetAddressValue}
        handler={(value) => streetAddressHandler(value)}
      />
      <Input
        label="City"
        value={cityValue}
        handler={(value) => cityHandler(value)}
      />
      <Input
        label="Post Code"
        value={postcodeValue}
        handler={(value) => postcodeHandler(value)}
      />
      <Input
        label="Country"
        value={countryValue}
        handler={(value) => countryHandler(value)}
      />
    </div>
  );
};

const PropertyUnitForm = ({
  floorsValue,
  floorsHandler,
  bathroomsValue,
  bathroomsHandler,
  bedroomsValue,
  bedroomsHandler,
  propertyDescValue,
  propertyDescHandler,
  patioChecked,
  gardenChecked,
  garageChecked,
  storageChecked,
  livingRoomChecked,
  officeChecked,
  fireplaceChecked,
  kitchenChecked,
  basementChecked,
  loftChecked,
  isCheckedPatio,
  isCheckedGarden,
  isCheckedGarage,
  isCheckedStorage,
  isCheckedLivingroom,
  isCheckedOffice,
  isCheckedFireplace,
  isCheckedKitchen,
  isCheckedBasement,
  isCheckedLoft,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Input
        label="How many floors?"
        value={floorsValue}
        handler={(value) => floorsHandler(value)}
      />
      <Input
        label="How many bathrooms?"
        value={bathroomsValue}
        handler={(value) => bathroomsHandler(value)}
      />
      <Input
        label="How many bedrooms?"
        value={bedroomsValue}
        handler={(value) => bedroomsHandler(value)}
      />
      <Input
        label="Property Description"
        value={propertyDescValue}
        handler={(value) => propertyDescHandler(value)}
      />
      <div>
        <CheckBoxComponent
          label="Patio"
          checked={patioChecked}
          isChecked={isCheckedPatio}
        />
        <CheckBoxComponent
          label="Garden"
          checked={gardenChecked}
          isChecked={isCheckedGarden}
        />
        <CheckBoxComponent
          label="Garage"
          checked={garageChecked}
          isChecked={isCheckedGarage}
        />
        <CheckBoxComponent
          label="Storage"
          checked={storageChecked}
          isChecked={isCheckedStorage}
        />
        <CheckBoxComponent
          label="Living Room"
          checked={livingRoomChecked}
          isChecked={isCheckedLivingroom}
        />
        <CheckBoxComponent
          label="Office"
          checked={officeChecked}
          isChecked={isCheckedOffice}
        />
        <CheckBoxComponent
          label="Fire place"
          checked={fireplaceChecked}
          isChecked={isCheckedFireplace}
        />
        <CheckBoxComponent
          label="Kitchen"
          checked={kitchenChecked}
          isChecked={isCheckedKitchen}
        />
        <CheckBoxComponent
          label="Basement"
          checked={basementChecked}
          isChecked={isCheckedBasement}
        />
        <CheckBoxComponent
          label="Loft"
          checked={loftChecked}
          isChecked={isCheckedLoft}
        />
      </div>
    </div>
  );
};

const Input = ({ label, value, handler }) => {
  return (
    <TextField
      style={{
        marginBottom: 10,
      }}
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      onChange={(event) => {
        handler(event.target.value);
      }}
    />
  );
};

const CheckBoxComponent = ({ label, checked, isChecked }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(event) => {
            isChecked(event.target.checked);
          }}
          name="checkedB"
          color="primary"
        />
      }
      label={label}
    />
  );
};
