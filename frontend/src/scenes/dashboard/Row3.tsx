import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";

function Row3() {
  const { palette } = useTheme();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

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
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
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
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "amount",
      headName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      //seeing how many products they bought
      field: "productIds",
      headName: "Counter",
      flex: 0.35,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="f">
        <BoxHeader
          title="List of Products"
          //grabbing the number of products,the length of it and display how many products I actually have
          sideText={`${productData?.length} products`}
        />
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
            //making sure that the data exists, otherwise representing an empty array
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="g">
        <BoxHeader
          title="Recent Orders"
          //grabbing the number of latest transactions,the length of it and display how many latest transactions I actually have
          sideText={`${transactionData?.length} latest transactions`}
        />
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
            //making sure that the data exists, otherwise representing an empty array
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader title="Overall Summary & Explanation Data" sideText="+16%" />
        <Box
          height="15px"
          margin="1.25rem 2rem 0.4rem 2rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
          <Typography margin="0.2rem 1rem" variant="h6">
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

export default Row3;
