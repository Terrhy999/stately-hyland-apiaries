import Image from "next/image";
import image1 from "../../public/images/spring-2021-honey-harvest/1-backyard.webp";
import image2 from "../../public/images/spring-2021-honey-harvest/2-hive.webp";
import image3 from "../../public/images/spring-2021-honey-harvest/3-hive.webp";

const postPage = () => {
  return (
    <div className="flex w-full flex-grow justify-center pt-3">
      <div className="prose font-lato">
        <h1>Spring 2021 Honey Harvest</h1>
        <div>
          <span>June 13, 2021 / </span>
          <span>Eileen Hyland</span>
        </div>
        <div>
          <p>
            I’ll walk you through “pulling” our Spring 2021 Honey from the hives
            at Stately Hyland Apiaries!
          </p>
          <div className="flex justify-center">
            <Image src={image1} alt="Beehives in backyard" />
          </div>
          <p>
            Spring 2021 is here at Stately Hyland Apiaries, and it was time to
            “pull” our honey.
          </p>
          <blockquote className="not-italic">
            <span className="font-bold">“Pull Honey”</span>
            <span className="italic"> ~ My Definition</span>
            <br />
            Remove a Honey Super from a beehive at the precise time for
            extraction of honey.
            <br />
            <span className="tracking-wide font-bold">
              - Stately Hyland Apiaries, Beekeeper
            </span>
          </blockquote>
          <p>
            I took the opportunity of setting up a time lapse camera to document
            our labors of{" "}
            <span className="underline">
              “Pulling Honey” at Stately Hyland Apiaries
            </span>
            , Spring 2021. (View the full video{" "}
            <a href="https://youtu.be/3Stqts62oe0">here</a>) Assisting me, is my
            youngest son, who is 19 and also studying Beekeeping{" "}
            <span className="italic">
              (currently pursuing Penn State Beginning Beekeeping Online
              Course!)
            </span>{" "}
            Not only is it exciting to share all my knowledge with my son, I
            have the added benefit of another set of eyes, hands and MUSCLES to
            help me with my more labor intensive tasks, like carrying;{" "}
            <span className="italic">
              ~ honey laden supers bursting with glistening light golden
              deliciousness ~
            </span>
            up to my car to bring to extract!
          </p>
          <p>
            The video begins on a steamy, humid 92° morning. We are wearing our
            protective bee suits. The first and foremost important part of
            Beekeeping, is to have a plan and all your tools in place. That is
            what we are doing- setting up our{" "}
            <a href="https://hivebutler.com/products/hive-butler-hive-tote-and-lid">
              Hive Butlers
            </a>
            which will hold the loose honey frames for transport. We are
            &apos;pulling&apos; honey first from my Medium Nuc Hive.
          </p>
          <div className="flex justify-center">
            <Image src={image2} alt="Beehive #1" />
          </div>
          <p>
            In this hive, I will manually brush bees off of the frames, back
            into the hive and put the frames inside of the Hive Butlers for
            transport. It is important to note, that this is NOT the preferred
            method of harvesting honey - but it will work for us on this day as
            the bees are in a strong nectar flow (are VERY busy foraging
            nectar). In times of dearth ~ (non nectar flow) the bees would try
            to retrieve that honey - meaning that they would not be easily
            “brushed” off of the frames. Luckily for us, they were amenable this
            day.
          </p>
          <p>
            The second hive that we “pulled honey” from was my Medium hive,
            named the “Sunny Hive”. This hive was successfully overwintered hive
            since 2019 from a very strong swarm that came from “Sun Valley”. We
            took two medium boxes of honey from this hive.
          </p>
          <div className="flex justify-center">
            <Image src={image3} alt="Beehive #2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default postPage;
