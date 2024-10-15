import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox"
import { useGetKpisQuery } from "@/state/api"
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function Row1() {
  const { palette } = useTheme();
  //data: which gonna be the result that we get
  //it's not gonna call anything coz we're not hitting our endpoint that doesn't exist
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useGetKpisQuery();
  
  //configuring our data into the proper format as needed
  //we need this function to only run as needed and use memo is perfect for that
  //what this is essentially doing is that we only wanna run this function only when data changes
  const revenueExpenses= useMemo(() => {
    return (
      data && //we wanna make sure that the data exist
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),  //the substring will grab the first three letter of each month, so it's a shortened version of the name of the month
          revenue: revenue,
          expenses: expenses,
        }
      }) //and if it does, we wanna grab the first element of the array (coz that's the first object), and we just wanna the monthly data fot this particular chart
    );
  }, [data]);


  const revenueProfit= useMemo(() => {
    return (
      data && //we wanna make sure that the data exist
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),  //the substring will grab the first three letter of each month, so it's a shortened version of the name of the month
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        }
      }) //and if it does, we wanna grab the first element of the array (coz that's the first object), and we just wanna the monthly data fot this particular chart
    );
  }, [data]);


  const revenue= useMemo(() => {
    return (
      data && //we wanna make sure that the data exist
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),  //the substring will grab the first three letter of each month, so it's a shortened version of the name of the month
          revenue: revenue,
        }
      }) //and if it does, we wanna grab the first element of the array (coz that's the first object), and we just wanna the monthly data fot this particular chart
    );
  }, [data]);
  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue & Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            {/* creating the gradient in the background chart */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Second Box */}
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit & Revenue"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* THIRD BOX */}
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month By Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar
              dataKey="revenue"
              fill="url(#colorRevenue)"
            />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default Row1