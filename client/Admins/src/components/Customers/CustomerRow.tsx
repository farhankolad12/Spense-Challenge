export type Customer = {
  id: string;
  name: string;
  profileImg: string;
  fullName: string;
  email: string;
  mobile: string;
};

export default function CustomerRow({ customer }: { customer: Customer }) {
  return (
    <tr>
      <td>{customer.id}</td>
      <td>
        <img
          src={
            customer.profileImg
              ? import.meta.env.VITE_APP_API_URL +
                "/public/uploads/" +
                customer.profileImg
              : import.meta.env.VITE_APP_API_URL + "/public/defaultProfile.png"
          }
          width="80px"
          alt="Profile"
        />
      </td>
      <td>{customer.fullName}</td>
      <td>{customer.email}</td>
      <td>+91 {customer.mobile}</td>
    </tr>
  );
}
