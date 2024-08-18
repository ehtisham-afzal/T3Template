import { Button } from "@/components/ui/button";

export default function Page() {
  const plans = [
    {
      name: "Basic plan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12,
      isMostPop: false,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
    },
    {
      name: "Startup",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 35,
      isMostPop: true,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
    },
    {
      name: "Enterprise",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 60,
      isMostPop: false,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
    },
  ];

  return (
    <section className="py-14">
      <div className="mx-auto max-w-screen-xl px-4 text-muted-foreground md:px-8">
        <div className="relative mx-auto max-w-xl sm:text-center">
          <h3 className="text-3xl font-semibold text-primary sm:text-4xl">
            Pricing for all sizes
          </h3>
          <div className="mt-3 max-w-xl">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              efficitur consequat nunc.
            </p>
          </div>
        </div>
        <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative mt-6 flex flex-1 flex-col items-stretch rounded-xl border-2 sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}
            >
              {item.isMostPop ? (
                <span className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full border bg-white px-3 py-2 text-center text-sm font-semibold text-gray-700 shadow-md">
                  Most popular
                </span>
              ) : (
                ""
              )}
              <div className="space-y-4 border-b p-8">
                <span className="font-medium text-blue-500">{item.name}</span>
                <div className="text-3xl font-semibold text-primary">
                  ${item.price}{" "}
                  <span className="text-xl font-normal text-muted-foreground">/mo</span>
                </div>
                <p>{item.desc}</p>
                <Button className="w-full">
                    Get Started
                </Button>
                {/* <button className="w-full rounded-lg bg-indigo-600 px-3 py-3 text-sm font-semibold text-white duration-150 hover:bg-indigo-500 active:bg-indigo-700">
                  Get Started
                </button> */}
              </div>
              <ul className="space-y-3 p-8">
                <li className="pb-2 font-medium text-primary">
                  <p>Features</p>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {featureItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
