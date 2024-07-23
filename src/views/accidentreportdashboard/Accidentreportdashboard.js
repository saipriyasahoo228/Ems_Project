import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download'; // Import DownloadIcon
import { visuallyHidden } from '@mui/utils';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'accident_report_date', numeric: false, disablePadding: true, label: 'Report Date' },
  { id: 'whitelevel_id', numeric: false, disablePadding: false, label: 'White Level ID' },
  { id: 'accident_type', numeric: true, disablePadding: false, label: 'Accident Type' },
  { id: 'severity', numeric: true, disablePadding: false, label: 'Severity' },
  { id: 'accident_id', numeric: false, disablePadding: false, label: 'Accident ID' },
  { id: 'workmen_count', numeric: true, disablePadding: false, label: 'Workmen Involved' },
  { id: 'workmen_names', numeric: false, disablePadding: false, label: 'Workmen Names' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? '4' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onDownload } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        ACCIDENT REPORTS
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download">
        <IconButton onClick={onDownload}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default function AccidentReportDashboard() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('accident_report_date');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const accessToken = 'access'; // Replace with your actual access token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.166:8000/reports/accident-reports/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Include the access token in the header
          },
          body: JSON.stringify({
            whitelevel_id: 'cttc1234',
            accident_type: 2,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const formattedData = data.results.map((item, index) => ({
          id: index + 1,
          accident_report_date: item.accident_report_date,
          whitelevel_id: item.whitelevel_id,
          accident_type: item.accident_type,
          severity: item.severity,
          accident_id: item.accident_id,
          workmen_count: item.workmen_involved.count,
          workmen_names: item.workmen_involved.names.map(name => name.employee_name).join(', '),
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rows, rowsPerPage],
  );

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Accident Report', 10, 10);
    doc.autoTable({
      head: [['Report Date', 'White Level ID', 'Accident Type', 'Severity', 'Accident ID', 'Workmen Involved', 'Workmen Names']],
      body: rows.map(row => [
        row.accident_report_date,
        row.whitelevel_id,
        row.accident_type,
        row.severity,
        row.accident_id,
        row.workmen_count,
        row.workmen_names
      ]),
    });
    doc.save('accident-report.pdf');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onDownload={handleDownload} />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isSelected(row.id)}
                  tabIndex={-1}
                  key={row.id}
                  selected={isSelected(row.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row" padding="4">
                    {row.accident_report_date}
                  </TableCell>
                  <TableCell align="left">{row.whitelevel_id}</TableCell>
                  <TableCell align="right">{row.accident_type}</TableCell>
                  <TableCell align="right">{row.severity}</TableCell>
                  <TableCell align="left">{row.accident_id}</TableCell>
                  <TableCell align="right">{row.workmen_count}</TableCell>
                  <TableCell align="left">{row.workmen_names}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
