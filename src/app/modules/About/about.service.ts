import { IAbout } from './about.interface';
import { About } from './about.model';

const getAboutDataFromDB = async () => {
  const aboutData = await About.findOne();
  return aboutData;
};

const updateAboutDataInDB = async (
  payload: Partial<IAbout>,
): Promise<IAbout | null> => {
  const aboutData = await About.findOneAndUpdate({}, payload, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  return aboutData;
};

const updateSectionInDB = async (payload: any, section: string) => {
  const update = { [section]: payload };
  const aboutData = await About.findOneAndUpdate({}, update, {
    new: true,
    runValidators: true,
  });
  return aboutData;
};

const updateSkillInDB = async (payload: any, category: string) => {
  const update = { [`skills.${category}`]: payload };
  const aboutData = await About.findOneAndUpdate({}, update, {
    new: true,
    runValidators: true,
  });
  return aboutData;
};

export const AboutService = {
  getAboutDataFromDB,
  updateAboutDataInDB,
  updateSectionInDB,
  updateSkillInDB
};
