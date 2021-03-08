import React, { useState } from "react";
import { connect } from "react-redux";
import { updateRestaurantProfile } from "../../store/actions/restaurant";
export const UpdateProfile = (props) => {
  const [profile, setProfile] = useState({
    address: props.restaurantProfile && props.restaurantProfile.address,
    description:
      (props.restaurantProfile && props.restaurantProfile.description) ||
      "Here are some great deals just for you",
    profileImageName: "",
    profileImageFile: "",
  });
  const onChange = (e) => {
    setProfile((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleFile = (e) => {
    setProfile((prevState) => {
      return {
        ...prevState,
        profileImageName: "Kachow" + Date.now(),
        profileImageFile: e.target.files[0],
      };
    });
  };

  const uploadProfileData = () => {
    console.log(profile.description);
    let profileFormObj = new FormData();
    profileFormObj.append("imageName", profile.profileImageName);
    profileFormObj.append("imageData", profile.profileImageFile);
    profileFormObj.append("address", profile.address);
    profileFormObj.append("description", profile.description);
    props.updateProfile(profileFormObj);
  };
  return (
    <div>
      {props.isRestaurantProfileLoading ? (
        <p>Loading </p>
      ) : (
        <>
          <div class="mb-3">
            <label htmlFor="formFile" className="form-label">
              Profile Image
            </label>
            <input
              class="form-control"
              name="profileImage"
              type="file"
              id="formFile"
              onChange={handleFile}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Restaurant Location/Address </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="restaurantAddress"
              name="address"
              value={profile.address}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={profile.description}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={uploadProfileData}
          >
            Update Profile
          </button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isRestaurantProfileLoading: state.restaurantProfile.loading,
  restaurantProfile: state.restaurantProfile.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profileFormObj) =>
      dispatch(updateRestaurantProfile(profileFormObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
