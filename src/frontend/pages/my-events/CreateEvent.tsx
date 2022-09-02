import { FormHelperText } from '@mui/material';
import { fetchUserEvents } from 'frontend/redux/slices/event';
import { dispatch } from 'frontend/redux/store';
import { addEvent } from 'frontend/services/eventService';
import { IS_TOKEN, OPTIONS_NETWORK_STAD } from 'frontend/utils';
import { NETWORKS } from 'frontend/web3/model';
import { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { fetchTokenDetails } from '../../web3/service';

const CreateEvent = () => {
  const { handleSubmit, formState, watch, control, setValue, reset } = useForm();
  // const { lstVanue } = useSelector((rootState: RootState) => rootState.admin);

  const network = watch('network');
  const tokenType = watch('tokenType');
  const tokenName = watch('tokenName');
  const tokenIcon = watch('tokenIcon');
  const tokenSymbol = watch('tokenSymbol');

  useEffect(() => {
    setValue('tokenType', '');
  }, [network]);

  const createEvent = async (objEvent: any) => {
    try {
      const {
        eventName,
        venueName,
        eventDescription,
        eventDate,
        eventstartTime,
        eventEndTime,
        network,
        balanceFrequency,
        tokenAddress,
        tokenName,
        tokenType,
        tokenSymbol,
        tokenDecimal,
        eventFequency,
        tokenIcon
      } = objEvent;

      const eventId = Math.floor(Math.random() * 100000 + 999999);

      const tokenData = {
        tokenName,
        tokenType,
        tokenSymbol: '',
        tokenDecimal: '',
        tokenIcon: ''
      };

      if (IS_TOKEN(tokenType)) {
        tokenData.tokenSymbol = tokenSymbol;
        tokenData.tokenDecimal = tokenDecimal as any;
        tokenData.tokenIcon = tokenIcon;
      }

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();

      const eventDateSplits = eventDate.split('-');
      const user = JSON.parse(localStorage.getItem('userData') ?? '{}');

      const io: any = {
        user: user?.id,
        eventId,
        eventName,
        valueName: venueName,
        eventDescription,
        eventDate: `${eventDateSplits[1]}/${eventDateSplits[2]}/${eventDateSplits[0]}`,
        eventstartTime,
        eventEndTime,
        eventPhoto:
          'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        eventDateCreated: `${mm}/${dd}/${yyyy}`,
        network,
        tokenAddress,
        eventFequency: eventFequency || 'Once',
        balanceFrequency: balanceFrequency || 1,
        ...tokenData
      };

      await addEvent(io);
      reset();
      toast.dismiss();
      dispatch(fetchUserEvents(user?.id));
    } catch (ex) {
      toast.dismiss();
      console.log(ex, 'Error Occurred in Create event');
    }
  };

  const onTokenAddressChange = async (e: any) => {
    console.log('onTokenAddressChange called ===>', e.target.value);
    const { value } = e.target;
    if (!network || !tokenType || !e.target.value) return;
    try {
      const tokenDetails = await fetchTokenDetails(network, tokenType, value);
      console.log('tokenDetails ===>', tokenDetails);
      if (!tokenDetails || !tokenDetails.name) {
        // setObjEvent({
        //   ...objEvent,
        //   tokenName: '',
        //   tokenSymbol: '',
        //   tokenDecimal: '' as any,
        //   tokenIcon: ''
        // });
        setValue('tokenName', '');
        setValue('tokenSymbol', '');
        setValue('tokenDecimal', '');
        setValue('tokenIcon', '');
      } else {
        setValue('tokenName', tokenDetails.name);
        // const objChanges: any = {
        //   tokenName: tokenDetails.name
        // };
        if (IS_TOKEN(tokenType)) {
          setValue('tokenSymbol', tokenDetails.symbol);
          setValue('tokenDecimal', tokenDetails.decimals);
          setValue('tokenIcon', tokenDetails.icon || '');
          // objChanges.tokenSymbol = tokenDetails.symbol;
          // objChanges.tokenDecimal = tokenDetails.decimals;
          // objChanges.tokenIcon = tokenDetails.icon || '';
        }
        // setObjEvent({
        //   ...objEvent,
        //   ...objChanges
        // });
      }
    } catch (err: any) {
      console.log('form onTokenAddressChange error ===>', err, err?.message);
      setValue('tokenName', '');
      setValue('tokenSymbol', '');
      setValue('tokenDecimal', '');
      setValue('tokenIcon', '');
      // setObjEvent({
      //   ...objEvent,
      //   tokenName: '',
      //   tokenSymbol: '',
      //   tokenDecimal: '' as any,
      //   tokenIcon: ''
      // });
    }
  };

  return (
    <form onSubmit={handleSubmit(createEvent)}>
      <Container>
        <h1>Add Event</h1>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Controller
                control={control}
                name="eventName"
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Control
                    ref={ref}
                    type="text"
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    placeholder="Event Name Here"
                  />
                )}
              />
              {formState.errors?.eventName?.type === 'required' && (
                <FormHelperText error={true}>Event name is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Select Venue</Form.Label>
            <Controller
              control={control}
              name="venueName"
              rules={{
                required: true
              }}
              render={({ field: { onChange, value = '', ref } }) => (
                <Form.Select
                  ref={ref}
                  className="mb-3"
                  value={value}
                  onChange={(e: any) => onChange(e.target.value)}
                >
                  <option value="">Select Venue</option>
                  <option value="Test Venue">Test Venue</option>
                  {/* {lstVanue.map((item, index) => (
                    <option value={item.venueName} key={index}>
                      {item.venueName}
                    </option>
                  ))} */}
                </Form.Select>
              )}
            />
            {formState.errors?.venueName?.type === 'required' && (
              <FormHelperText error={true}>Venue name is required</FormHelperText>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Event Description</Form.Label>
              <Controller
                control={control}
                name="eventDescription"
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Control
                    as="textarea"
                    ref={ref}
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    placeholder="Description"
                    rows={3}
                  />
                )}
              />
              {formState.errors?.eventDescription?.type === 'required' && (
                <FormHelperText error={true}>Event description is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Event Date</Form.Label>
              <Controller
                control={control}
                name="eventDate"
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Control
                    ref={ref}
                    type="date"
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                  />
                )}
              />
              {formState.errors?.eventDate?.type === 'required' && (
                <FormHelperText error={true}>Event date is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Controller
                control={control}
                name="eventstartTime"
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Control
                    ref={ref}
                    type="time"
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                  />
                )}
              />
              {formState.errors?.eventstartTime?.type === 'required' && (
                <FormHelperText error={true}>Event start time is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Controller
                control={control}
                name="eventEndTime"
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Control
                    ref={ref}
                    type="time"
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                  />
                )}
              />
              {formState.errors?.eventEndTime?.type === 'required' && (
                <FormHelperText error={true}>Event end time is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Event Frequency</Form.Label>
              <Controller
                control={control}
                name="eventFequency"
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Select
                    ref={ref}
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                  >
                    <option value="">Select Frequency</option>
                    <option value="Once">Once</option>
                    <option value="Year">Year</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                  </Form.Select>
                )}
              />
              {formState.errors?.eventFequency?.type === 'required' && (
                <FormHelperText error={true}>Event frequency is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Settings</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Network</Form.Label>
              <Controller
                control={control}
                name="network"
                rules={
                  {
                    // required: true
                  }
                }
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Select
                    className="mb-3"
                    ref={ref}
                    value={value}
                    onChange={(e: any) => onChange(parseInt(e.target.value, 10))}
                  >
                    <option value="">Select Network</option>
                    {Object.entries(NETWORKS).map((item, index) => (
                      <option value={item[0]} key={index}>
                        {item[1].name}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              {formState.errors?.network?.type === 'required' && (
                <FormHelperText error={true}>Network is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Controller
                control={control}
                name="tokenType"
                rules={
                  {
                    // required: true
                  }
                }
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Select
                    className="mb-3"
                    ref={ref}
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    {network &&
                      Object.entries(OPTIONS_NETWORK_STAD).map((item, index) => {
                        if (item[1].networks.includes(network)) {
                          return (
                            <option value={item[0]} key={index}>
                              {item[1].name}
                            </option>
                          );
                        }
                        return null;
                      })}
                  </Form.Select>
                )}
              />
              {formState.errors?.tokenType?.type === 'required' && (
                <FormHelperText error={true}>Token type is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Token Address</Form.Label>
              <Controller
                control={control}
                name="tokenAddress"
                rules={
                  {
                    // required: true
                  }
                }
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Control
                    ref={ref}
                    type="text"
                    value={value}
                    onChange={(e: any) => {
                      onChange(e.target.value);
                      onTokenAddressChange(e);
                    }}
                  />
                )}
              />
              {formState.errors?.tokenAddress?.type === 'required' && (
                <FormHelperText error={true}>Token address is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Token Name</Form.Label>
              <Controller
                control={control}
                name="tokenName"
                rules={
                  {
                    // required: true
                  }
                }
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Control
                    type="text"
                    ref={ref}
                    onChange={(e: any) => {
                      onChange(e.target.value);
                    }}
                    value={value}
                    // disabled={!!tokenName}
                    disabled={true}
                  />
                )}
              />
              {formState.errors?.tokenName?.type === 'required' && (
                <FormHelperText error={true}>Token name is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {IS_TOKEN(tokenType) && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Token Symbol</Form.Label>
                  <Controller
                    control={control}
                    name="tokenSymbol"
                    rules={
                      {
                        // required: true
                      }
                    }
                    render={({ field: { onChange, value = '', ref } }) => (
                      <Form.Control
                        type="text"
                        // disabled={IS_TOKEN(tokenType)}
                        ref={ref}
                        onChange={(e: any) => {
                          onChange(e.target.value);
                        }}
                        value={value}
                        disabled={true}
                      />
                    )}
                  />
                  {formState.errors?.tokenSymbol?.type === 'required' && (
                    <FormHelperText error={true}>Token symbol is required</FormHelperText>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Token Decimal</Form.Label>
                  <Controller
                    control={control}
                    name="tokenDecimal"
                    rules={
                      {
                        // required: true
                      }
                    }
                    render={({ field: { onChange, value = '', ref } }) => (
                      <Form.Control
                        type="number"
                        // disabled={IS_TOKEN(tokenType)}
                        ref={ref}
                        onChange={(e: any) => {
                          onChange(e.target.value);
                        }}
                        value={value}
                        disabled={true}
                      />
                    )}
                  />
                  {formState.errors?.tokenDecimal?.type === 'required' && (
                    <FormHelperText error={true}>Token decimal is required</FormHelperText>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Token Icon</Form.Label>

                  <div className="d-flex text-center">
                    <img
                      src={tokenIcon}
                      alt={tokenSymbol}
                      height="20"
                      width="20"
                      className="tokenIcon m-2"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = '/images/logo.png';
                      }}
                    />
                    <Controller
                      control={control}
                      name="tokenIcon"
                      rules={
                        {
                          // required: true
                        }
                      }
                      render={({ field: { onChange, value = '', ref } }) => (
                        <Form.Control
                          type="text"
                          className="ml-2"
                          ref={ref}
                          onChange={(e: any) => {
                            onChange(e.target.value);
                          }}
                          value={value}
                          disabled={true}
                        />
                      )}
                    />
                  </div>
                  {formState.errors?.tokenIcon?.type === 'required' && (
                    <FormHelperText error={true}>Token icon is required</FormHelperText>
                  )}
                </Form.Group>
              </>
            )}
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Balance Required</Form.Label>
              <Controller
                control={control}
                name="balanceFrequency"
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value = '', ref } }) => (
                  <Form.Control
                    type="number"
                    ref={ref}
                    min={1}
                    defaultValue={1}
                    onChange={(e: any) => {
                      onChange(e.target.value);
                    }}
                    value={value}
                  />
                )}
              />
              {formState.errors?.balanceFrequency?.type === 'required' && (
                <FormHelperText error={true}>Balance is required</FormHelperText>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col style={{ textAlign: 'center' }}>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default CreateEvent;
