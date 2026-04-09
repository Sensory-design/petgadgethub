export type UkBreedOption =
  | "labrador"
  | "french_bulldog"
  | "cocker_spaniel"
  | "golden_retriever"
  | "staffordshire_bull_terrier"
  | "other";

export type RentalResumeForm = {
  ownerName: string;
  petName: string;
  breed: UkBreedOption;
  breedOther: string;
  behaviorTraining: string;
  behaviorPledge: string;
  healthVaccinations: string;
  healthParasite: string;
  insuranceNote: string;
};
