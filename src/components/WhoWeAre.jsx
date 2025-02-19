import React from "react";

const WhoWeAre = () => {
  return (
    <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="md:w-1/2 order-2 md:order-1 text-center md:text-left">
        <h2 className="text-3xl font-bold text-primary">Biz Kimiz?</h2>
        <p className="text-gray-600 mt-4">
          Fermentum placerat penatibus dictum; elit etiam nullam. Molestie
          finibus tristique class tincidunt netus malesuada. Quam lorem commodo
          consectetur, mollis cursus hac sed facilisis. Suscipit habitant tempus
          metus ex sodales faucibus eget senectus. Hendrerit ut morbi felis
          cursus nostra. Taciti velit donec suspendisse euismod ac blandit
          facilisis eget. Pulvinar platea sodales faucibus, suscipit ad nam.
        </p>
      </div>
      <div className="md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end">
        <img
          src="https://placehold.co/500x500"
          alt="Biz kimiz"
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] object-cover"
        />
      </div>
    </section>
  );
};

export default WhoWeAre;
