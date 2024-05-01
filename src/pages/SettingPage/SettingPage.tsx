import React from "react";
import SearchUser from "../../components/SearchUser/SearchUser";
import CollapseBox from "../../components/CollapseBox/CollapseBox";
import "./SettingPage.css";

const SettingPage: React.FC = () => {
  const reactTitle = "GitHub Terms of Service";
  const reactContent =
    "Thank you for using GitHub! We're happy you're here. Please read this Terms of Service agreement carefully before accessing or using GitHub. Because it is such an important contract between us and our users, we have tried to make it as clear as possible. For your convenience, we have presented these terms in a short non-binding summary followed by the full legal terms.";

  const nextTitle = "GitHub General Privacy Statement";
  const nextContent =
    "Effective date: February 1, 2024 \
 \
    Welcome to the GitHub Privacy Statement. This is where we describe how we handle your “Personal Data”, which is information that is directly linked or can be linked to you. It applies to the Personal Data that GitHub, Inc. or GitHub B.V., processes as the “Data Controller” when you interact with websites, applications, and services that display this Statement (collectively, “Services”). This Statement does not apply to services or products that do not display this Statement, such as Previews, where relevant.";

  return (
    <div className="setting-page">
      <h1>GitHub User Search</h1>
      <SearchUser />
      <CollapseBox title={reactTitle} content={reactContent} />
      <CollapseBox title={nextTitle} content={nextContent} />
      <hr />
    </div>
  );
};

export default SettingPage;
