import { useMemo, useRef } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import numbro from "numbro";

interface IDatum {
  x: string | number;
  y: number;
}

type TCurrency = "EUR" | "USD";

interface IProps {
  header: {
    title: string;
    subtitle?: string;
  };
  xAxis: {
    title: string;
  };
  yAxis: IProps["xAxis"] & {
    currency?: TCurrency;
  };
  data?: IDatum[];
}

export default function Chart({
  header: { title, subtitle },
  xAxis,
  yAxis,
  data
}: IProps) {
  // @ts-ignore ...
  const options = useMemo<Options>(() => {
    const allLabels = data?.map(({ x: label }) => String(label));
    const uniqueLabels = new Set(allLabels);
    const categories = Array.from(uniqueLabels);
    const series = categories.map(category => {
      const values = data
        ?.filter(({ x }) => String(x) === category)
        .map(({ y }) => y);
      const sumOfValues = values?.reduce((prev, curr) => prev + curr);
      return {
        name: category,
        y: sumOfValues
      };
    });

    return {
      title: {
        text: title
      },
      subtitle: {
        text: subtitle
      },
      xAxis: {
        title: {
          text: xAxis.title
        },
        categories,
        crosshair: true
      },
      yAxis: {
        labels: {
          formatter: ({ value }) => {
            if (typeof value === "number" && yAxis.currency) {
              const is = (c: TCurrency) => c === yAxis.currency;
              const isEUR = is("EUR");

              const formattedValue = numbro(value).formatCurrency({
                average: true,
                mantissa: 1,
                optionalMantissa: true,
                currencyPosition: isEUR ? "postfix" : "prefix",
                currencySymbol: isEUR ? " €" : "$",
                spaceSeparatedCurrency: true
              });
              return formattedValue;
            }
            return value;
          }
        },
        min: 0,
        title: {
          text: yAxis.title
        },
        crosshair: true
      },
      series: [
        {
          type: "column",
          data: series
        }
      ],
      legend: {
        enabled: false
      },
      tooltip: {
        shared: true,
        headerFormat: "<p class='chart__tooltip-header'>{point.key}</p><br />",
        pointFormat: "<p class='chart__tooltip-value'>{point.y}</p>"
      }
    };
  }, [data, subtitle, title, xAxis.title, yAxis.currency, yAxis.title]);
  const ref = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={ref} />
  );
}
