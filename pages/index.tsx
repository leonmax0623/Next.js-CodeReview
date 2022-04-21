import Chart from "@components/Chart";
import Table from "@components/Table";
import { useQuery } from "react-query";

type TResult = {
  date: string;
  title: string;
  country: string;
  sectors: string;
  signed_amount: number;
};

export default function Index() {
  const { data: EIB_data } = useQuery<TResult[]>("eib", async () => {
    const res = await fetch("https://robots.trounceflow.com/api/get_eib_data/");
    return res.json();
  });

  const { data: EBRD_data } = useQuery<TResult[]>("ebrd", async () => {
    const res = await fetch(
      "https://robots.trounceflow.com/api/get_ebrd_data/"
    );
    return res.json();
  });

  return (
    <div className="grid grid-rows-2 gap-6 lg:p-8">
      <div>
        <Chart
          header={{
            title: "Investments",
            subtitle: "Source: EIB"
          }}
          xAxis={{
            title: "Country"
          }}
          yAxis={{
            title: "Signed amount",
            currency: "EUR"
          }}
          data={EIB_data?.map(({ country: x, signed_amount: y }) => ({ x, y }))}
        />
        <Table data={EIB_data} sortable />
      </div>

      <div>
        <Chart
          header={{
            title: "Investments",
            subtitle: "Source: EBRD"
          }}
          xAxis={{
            title: "Country"
          }}
          yAxis={{
            title: "Signed amount",
            currency: "USD"
          }}
          data={EIB_data?.map(({ country: x, signed_amount: y }) => ({ x, y }))}
        />

        <Table data={EBRD_data} sortable />
      </div>
    </div>
  );
}
