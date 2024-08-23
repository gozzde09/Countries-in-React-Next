import PropTypes from "prop-types";
import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

export default function PageKontrol(props) {
 const { page, lastPage, countryAntal, next, previous, first, last, setPage } = props;

 //Total antal sidor för dropdown meny
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
      <div className='d-flex justify-content-end m-4'>
        <ButtonToolbar aria-label='Toolbar with button groups'>
          <ButtonGroup className='mx-1'>
            <Button variant='success' disabled={page === 1} onClick={first}>
              &laquo;
            </Button>
            <Button variant='success' disabled={page === 1} onClick={previous}>
              &lsaquo;
            </Button>
          </ButtonGroup>
          <ButtonGroup className='mx-1'>
            <Button variant='success' disabled={page === 1} onClick={previous}>
              Föregående
            </Button>

            <Dropdown>
              <Dropdown.Toggle variant='light' id='dropdown-basic'>
                Sida {page} av {lastPage}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {getPages().map((pageNum) => (
                  <Dropdown.Item key={pageNum} onClick={() => setPage(pageNum)}>
                    {pageNum}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Button
              variant='success'
              disabled={page === lastPage || countryAntal < 20}
              onClick={next}>
              Nästa
            </Button>
          </ButtonGroup>
          <ButtonGroup className='mx-1'>
            <Button
              variant='success'
              disabled={page === lastPage || countryAntal < 20}
              onClick={next}>
              &rsaquo;
            </Button>
            <Button
              variant='success'
              disabled={page === lastPage || countryAntal < 20}
              onClick={last}>
              &raquo;
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
}

PageKontrol.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  countryAntal: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  first: PropTypes.func.isRequired,
  last: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};
