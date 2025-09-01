import React from "react";
import EditInfluencerForm from "../_components/EditInfluencerForm";
import { getInfluencerById } from "@/service/influencer";

const EditInfluencer = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const influencer = await getInfluencerById(id);
  return (
    <div>
      <EditInfluencerForm influencer={influencer} />
    </div>
  );
};

export default EditInfluencer;
