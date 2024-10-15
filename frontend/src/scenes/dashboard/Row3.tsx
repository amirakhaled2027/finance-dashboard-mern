import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";

function Row3() {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  //we're using redux toolkit query so basically of you have used useGetKpisQuery
  //and calling it in multiple locations even though all of these are all on the same page
  //so you may think we're calling the API endpoint unnecessarily however 
  //redux toolkit query allows us to not have to deal with that  
  //so you can call this multiple times in any location, and redux toolkit query will make sure
  //you only call it once if the information is already there 
  //and we only need to re-update that information when we set another API call
  //to invalidate that particular tag
  //so invalidation means just recalling that information just to get the updated information
  //from the backend
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            // the highlighted part
            {
              name: key,
              value: value,
            },
            //the un-highlighted part
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            }
          ]
        }
      )
    }
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`
    },
    {
      field: "price",
      headName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headName: "Buyer",
      flex: 0.67,
      renderCell: (params: GridCellParams) => `${params.value}`
    },
    {
      field: "amount",
      headName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`
    },
    {
      //I wanna see how many products they bought
      field: "productIds",
      headName: "Counter",
      flex: 0.35,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    },
  ];



  
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          // this is gonna garb the number of products, and we're gonna grab the length of it and display how many products we actually have
          sideText={`${productData?.length} products`}
        />
        {/* you can create a Box around DataGrid and target the classes inside the DataGrid from above with (and &)*/}
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeader": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            // we wanna make sure that the data exists, otherwise we wanna represent an empty array
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          // this is gonna garb the number of products, and we're gonna grab the length of it and display how many products we actually have
          sideText={`${transactionData?.length} latest transactions`}
        />
        {/* you can create a Box around DataGrid and target the classes inside the DataGrid from above with (and &)*/}
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeader": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            // we wanna make sure that the data exists, otherwise we wanna represent an empty array
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j">
        <BoxHeader title="Overall Summary & Explanation Data" sideText="+16%" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
          <Typography margin='0 1rem' variant='h6'>
            Some important ratios to calculate include profitability ratios,
            liquidity ratios, and leverage ratios. Compare financial statement
            data over multiple periods to identify trends and patterns. Look for
            consistent growth or decline in key metrics, such as revenue, profit
            margins, or ratios.
          </Typography>
        </Box>
      </DashboardBox>
    </>
  );
}

export default Row3