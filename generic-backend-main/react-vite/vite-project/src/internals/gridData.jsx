import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }



  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status) {
  const colors = {
    Online: 'success',
    Offline: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(params) {
  if (params.value == null) {
    return '';
  }



  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns = [
  { field: 'pageTitle', headerName: 'Page Title', flex: 1.5, minWidth: 200 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: 'users',
    headerName: 'Users',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'eventCount',
    headerName: 'Event Count',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'viewsPerUser',
    headerName: 'Views per User',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'averageTime',
    headerName: 'Average Time',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'conversions',
    headerName: 'Daily Conversions',
    flex: 1,
    minWidth: 150,
    renderCell: renderSparklineCell,
  },
];

export const rows = [
  {
    id: 1,
    pageTitle: 'Homepage Overview',
    status: 'Online',
    eventCount: 8345,
    users: 212423,
    viewsPerUser: 18.5,
    averageTime: '2m 15s',
    conversions: [
      469172, 488506, 592287, 617401, 640374, 632751, 668638, 807246, 749198, 944863,
      911787, 844815, 992022, 1143838, 1446926, 1267886, 1362511, 1348746, 1560533,
      1670690, 1695142, 1916613, 1823306, 1683646, 2025965, 2529989, 3263473,
      3296541, 3041524, 2599497,
    ],
  },
  {
    id: 2,
    pageTitle: 'Product Details - Gadgets',
    status: 'Online',
    eventCount: 5653,
    users: 172240,
    viewsPerUser: 9.7,
    averageTime: '2m 30s',
    conversions: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      557488, 1341471, 2044561, 2206438,
    ],
  },
  {
    id: 3,
    pageTitle: 'Checkout Process - Step 1',
    status: 'Offline',
    eventCount: 3455,
    users: 58240,
    viewsPerUser: 15.2,
    averageTime: '2m 10s',
    conversions: [
      166896, 190041, 248686, 226746, 261744, 271890, 332176, 381123, 396435, 495620,
      520278, 460839, 704158, 559134, 681089, 712384, 765381, 771374, 851314, 907947,
      903675, 1049642, 1003160, 881573, 1072283, 1139115, 1382701, 1395655, 1355040,
      1381571,
    ],
  },
  {
    id: 4,
    pageTitle: 'User Profile Dashboard',
    status: 'Online',
    eventCount: 112543,
    users: 96240,
    viewsPerUser: 4.5,
    averageTime: '2m 40s',
    conversions: [
      264651, 311845, 436558, 439385, 520413, 533380, 562363, 533793, 558029, 791126,
      649082, 566792, 723451, 737827, 890859, 935554, 1044397, 1022973, 1129827,
      1145309, 1195630, 1358925, 1373160, 1172679, 1340106, 1396974, 1623641,
      1687545, 1581634, 1550291,
    ],
  },
  {
    id: 5,
    pageTitle: 'Article Listing - Tech News',
    status: 'Offline',
    eventCount: 3653,
    users: 142240,
    viewsPerUser: 3.1,
    averageTime: '2m 55s',
    conversions: [
      251871, 262216, 402383, 396459, 378793, 406720, 447538, 451451, 457111, 589821,
      640744, 504879, 626099, 662007, 754576, 768231, 833019, 851537, 972306,
      1014831, 1027570, 1189068, 1119099, 987244, 1197954, 1310721, 1480816, 1577547,
      1854053, 1791831,
    ],
  },
 
];