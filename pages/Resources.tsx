const Resources = () => {
  return (
    <div className="w-full prose prose-lg prose-blockquote:border-gray-500 prose-blockquote:bg-gray-300 prose-blockquote:overflow-auto font-lato">
      <h2>Beekeeping Resources</h2>
      <blockquote>
        <p>
          A trick I learned when working on the Master Gardener Help Line was to
          get my information from only Educational sources. (This cut out
          advertising and misinformation.)
        </p>
        <p className="font-bold text-md">
          To become better educated in Beekeeping (or anything) it is important
          to get your information from educational resources.
        </p>
      </blockquote>
      <p>
        To do this, try your Google Search with{" "}
        <span className="font-bold">SITE:EDU</span> at the end of it and you
        will see only EDUCATIONAL, ad free information from research
        universities.
      </p>
      <p>
        For example, search for information on Cicada Killer Wasps by Googling:{" "}
        <span className="font-bold">Cicada Killer Wasp NJ SITE:EDU</span>
      </p>
      <p className={"mb-0 font-bold uppercase"}>
        Beekeping Associations, Clubs
      </p>
      <ul>
        <li>
          <a href="https://www.njbeekeepers.org/">
            New Jersey Beekeepers Associatoin
          </a>
        </li>
        <li>
          <a href="https://www.nj.gov/agriculture/divisions/pi/pdf/NJBeekeepingRegulationsFAQs.pdf">
            New Jersey Beekeeping Regulations FAQs
          </a>
        </li>
        <li>
          <a href="https://www.njbeekeepers.org/LocalBranches.htm">
            New Jersey Beekeepers Local Branches
          </a>
        </li>
      </ul>
      <p className={"mb-0 font-bold uppercase"}>Certification Courses</p>
      <ul>
        <li>
          <a href="https://njba38.wildapricot.org/Sys/Store/Products/258709">
            Essex County NJ Beekeepers Club Beekeeping Certification Course
            $50.00
          </a>
        </li>
        <li>
          <a href="https://extension.psu.edu/beekeeping-101">
            Penn State Extension Beekeeping 101 ONLINE Course $159.00
          </a>
        </li>
        <li>
          <a href="http://www.cpe.rutgers.edu/courses/current/ae0401wa.html">
            Rutgers Bee-ginner&apos;s Beekeeping: The Basics of Apiculture
            Course $320.00
          </a>
        </li>
      </ul>
      <p className={"mb-0 font-bold uppercase"}>Beekeeping Labels</p>
      <ul>
        <li>
          <a href="https://www.zazzle.com/store/beekeepingsupplies?rf=238706651823519504">
            Zazzle Beekeeping Labels (Made by my niece!)
          </a>
        </li>
      </ul>
      <p className={"mb-0 font-bold uppercase"}>Supply Catalogs</p>
      <ul>
        <li>
          <a href="https://www.betterbee.com/misc/catalog-2021.asp">
            Better Bee
          </a>
        </li>
        <li>
          <a href="https://www.dadant.com/digital-catalog/">Dadant</a>
        </li>
        <li>
          <a href="https://www.mannlakeltd.com/catalog">Mann Lake</a>
        </li>
      </ul>
      <p className={"mb-0 font-bold uppercase"}>Articles</p>
      <ul>
        <li>
          <a href="https://extension.psu.edu/beekeeping-honey-bees">
            Beekeeping - Honey Bees (Penn State Extension)
          </a>
        </li>
        <li>
          <a href="https://extension.psu.edu/beekeeping-basics">
            Beekeeping Basics (PREVIEW SAMPLE)
          </a>
        </li>
      </ul>
      <p className={"mb-0 font-bold uppercase"}>Videos</p>
      <ul>
        <li>
          <a href="https://extension.psu.edu/installing-packaged-bees">
            Installing Packaged Bees (Penn State Extension)
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Resources;
