import { useNavigate } from "react-router-dom";
import { useState } from "react";
import profileImage from "../assets/profile.png";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import PlusCircle from "@heroicons/react/24/solid/PlusCircleIcon";
import Modal from "./modal";
import {
  useProfilesContext,
  useProfilesDispatchContext,
} from "../common/profiles-context";
import { ActionType, UserProfile } from "../common/types";

export default function Profiles({ edit }: { edit: boolean }) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const userProfiles = useProfilesContext();
  const dispatch = useProfilesDispatchContext() as React.Dispatch<ActionType>;
  const [profile, setProfile] = useState<UserProfile>();
  const navigate = useNavigate();
  function manageProfiles() {
    navigate("/ManageProfiles");
  }
  function onProfileClick(profile: UserProfile) {
    dispatch({ type: "current", payload: profile });
    navigate("/browse");
  }
  const heading = !edit ? "Who's watching?" : "Manage Profiles:";
  function closeEditor() {
    setIsEditProfileOpen(false);
  }
  function openEditor() {
    setIsEditProfileOpen(true);
  }

  function onEditProfile(profile: UserProfile) {
    setProfile(profile);
    openEditor();
  }

  function onAddProfile() {
    const newProfile: UserProfile = {
      id: "",
      name: "",
      imageUrl: profileImage,
    };
    setProfile(newProfile);
    openEditor();
  }
  function onSaveProfile(profile: UserProfile) {
    const action: ActionType = {
      type: profile.id ? "edit" : "add",
      payload: profile,
    };
    dispatch(action);
    setIsEditProfileOpen(false);
  }

  function onDeleteProfile(profile: UserProfile) {
    const action: ActionType = {
      type: "delete",
      payload: profile,
    };
    dispatch(action);
    setIsEditProfileOpen(false);
  }

  return (
    <>
      <h1 className="mb-8 text-6xl">{heading}</h1>
      <section className="flex gap-4">
        {userProfiles?.profiles?.map((profile) => (
          <ProfileCard
            key={profile.id}
            onProfileClick={onProfileClick}
            profile={profile as UserProfile}
            onEditClick={onEditProfile}
            edit={edit}
          />
        ))}
        <AddProfile onAddProfile={onAddProfile} />
      </section>
      {profile ? (
        <EditProfile
          edit={edit}
          isOpen={isEditProfileOpen}
          title=""
          onClose={closeEditor}
          profile={profile}
          onSave={onSaveProfile}
          onDelete={onDeleteProfile}
        ></EditProfile>
      ) : null}
      {edit ? (
        <>
          <ProfileButton onClick={() => navigate("/")} className="mt-8">
            Done
          </ProfileButton>
        </>
      ) : (
        <ProfileButton
          onClick={manageProfiles}
          className="mt-8"
          buttonType="secondary"
        >
          Manage Profiles
        </ProfileButton>
      )}
    </>
  );
}

function ProfileButton({
  buttonType = "primary",
  ...props
}: {
  buttonType?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`py-2 px-4 text-xl ${props.className} ${
        buttonType === "primary"
          ? "bg-gray-100 text-gray-700 hover:bg-netflixRed hover:text-white"
          : "border border-white text-gray-400 hover:text-white"
      }`}
    >
      {props.children}
    </button>
  );
}

function ProfileCard({
  edit,
  onEditClick,
  profile,
  onProfileClick,
}: {
  edit: boolean;
  onEditClick: (profile: UserProfile) => void;
  onProfileClick: (profile: UserProfile) => void;
  profile: UserProfile;
}) {
  const { id, name, imageUrl } = profile;
  function editClick(event: React.SyntheticEvent) {
    event.stopPropagation();
    onEditClick(profile);
  }
  return (
    <section
      id={id}
      onClick={() => onProfileClick(profile)}
      className="flex cursor-pointer flex-col place-items-center gap-2 text-gray-400 hover:text-white"
    >
      <section className="relative h-[10vw] max-h-[200px] min-h-[84px] w-[10vw] min-w-[84px] max-w-[200px] overflow-hidden rounded-md hover:border-4 hover:border-gray-100 ">
        <img src={imageUrl} alt={name} />
        {edit ? (
          <button
            className="absolute inset-0 grid place-items-center bg-black/50"
            onClick={editClick}
          >
            <PencilIcon className="w-[25%] text-white" />
          </button>
        ) : null}
      </section>
      <h1 className="text=xl">{name}</h1>
    </section>
  );
}

function AddProfile({ onAddProfile }: { onAddProfile: () => void }) {
  return (
    <section className="flex cursor-pointer flex-col place-items-center gap-2 text-gray-400">
      <button
        onClick={onAddProfile}
        className="grid  h-[10vw] max-h-[200px] min-h-[84px] w-[10vw] min-w-[84px] max-w-[200px] place-items-center overflow-hidden rounded-md hover:border-4  hover:border-gray-100 hover:bg-gray-400 hover:text-white"
      >
        <PlusCircle className="w-[75%]" />
      </button>
    </section>
  );
}

function EditProfile(props: {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  title: string;
  edit?: boolean;
  profile: UserProfile;
  onSave?: (profile: UserProfile) => void;
  onDelete: (profile: UserProfile) => void;
}) {
  const heading = props.profile.id ? "Edit Profile" : "Add Profile";
  function cancelEdit() {
    props.onClose(false);
  }
  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { profileName } = event.target as typeof event.target & {
      profileName: HTMLInputElement;
    };
    if (props.onSave) {
      let profile = {
        name: profileName.value,
        id: props?.profile.id,
        imageUrl: props?.profile.imageUrl,
      };
      props.onSave(profile);
    }
  }
  return (
    <Modal {...props}>
      <section className="h-screen w-screen">
        <form onSubmit={onSubmit} className="mx-auto my-16 max-w-4xl">
          <h1 className="mb-4 text-6xl">{heading}</h1>
          <section className="grid grid-cols-[200px_auto] gap-4 border-t border-b p-4 text-gray-100 ">
            <section className="aspect-square overflow-hidden rounded-md">
              <img src={props.profile.imageUrl} alt="Profile Image" />
            </section>
            <section>
              <input
                name="profileName"
                id="profileName"
                defaultValue={props.profile.name}
                type="text"
                className="w-full bg-zinc-500 p-2 outline-none"
                placeholder="Enter Profile Name"
              />
            </section>
          </section>
          <section className="mt-8 flex gap-4">
            <ProfileButton type="submit">Save</ProfileButton>
            {props.profile.id ? (
              <ProfileButton
                buttonType="secondary"
                type="button"
                onClick={() => props.onDelete(props.profile)}
              >
                Delete Profile
              </ProfileButton>
            ) : null}
            <ProfileButton
              buttonType="secondary"
              onClick={cancelEdit}
              type="button"
            >
              Cancel
            </ProfileButton>
          </section>
        </form>
      </section>
    </Modal>
  );
}
