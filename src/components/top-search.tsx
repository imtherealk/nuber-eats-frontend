import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

interface IFormProps {
  searchTerm: string;
}

export const TopSearch = () => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();

  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div className="bg-yellow-100 relative flex justify-between overflow-hidden h-96 w-full">
      <img
        alt="Foods on left"
        src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/c7e1c939303e270185f0e891858e04ee.svg"
        className="z-10 h-full w-1/2 md:w-1/3 object-cover flex-none"
      />
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="z-20 flex-auto flex -mx-48 md:-mx-12 items-center justify-center"
      >
        <input
          ref={register({ required: true, min: 3 })}
          name="searchTerm"
          type="Search"
          className="input rounded-md border-0 w-full"
          placeholder="Search restaurants"
        />
      </form>
      <img
        alt="Foods on right"
        src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/27ec7839cfd96d0aae01e6c442741e2c.svg"
        className="h-full w-1/2 md:w-1/3 object-cover flex-none"
      />
    </div>
  );
};
