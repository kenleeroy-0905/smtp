import axios from "axios";

export const setChosenDomain = async (domain, companyId, token) => {
  const data = {
    action: "add",
    domain_name: domain,
    company_id: companyId,
    token: token,
  };
  try {
    const response = await axios.post("/domain/create_domain.php", data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getDnsRecords = async (domain, companyId, token) => {
  const data = {
    domain_name: domain,
    company_id: companyId,
    token: token,
  };
  try {
    const response = await axios.post("/domain/get_dns_domain.php", data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
