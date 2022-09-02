import React, { useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Stack } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { HiInformationCircle } from 'react-icons/hi';
import CoverProfileDropzone from 'frontend/components/create-page/CoverProfileDropzone';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import coverPhoto from '../../material/images/create-page-cover-photo.png';

const CreatePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isPageCreated, setIsPageCreated] = useState(false);
  const [uploadedProfilePicture, setUploadedProfilePicture] = useState<any>([]);
  const [uploadedCoverPicture, setUploadedCoverPicture] = useState<any>([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const watchAllFields = watch();

  const handleCreatePage = (data: { page_name: string; category: string; description: string }) => {
    console.log('page created', data);
    setIsPageCreated(true);
  };

  return (
    <Stack
      direction="row"
      className="create-page-container"
      sx={{
        borderLeft: `1px solid ${theme.palette.grey[700]}`,
        borderRight: `1px solid ${theme.palette.grey[700]}`,
        borderBottom: `1px solid ${theme.palette.grey[700]}`
      }}
    >
      {/* left side create section */}
      <form
        style={{ width: window.innerWidth < 1000 ? '100%' : '30%' }}
        onSubmit={handleSubmit(handleCreatePage)}
        className="left-side-panel"
        autoComplete="off"
      >
        {/* header */}
        <Stack direction="row" justifyContent="space-between" className="header-container">
          <Stack>
            {/* navigation text */}
            <Stack className="secondary-text-color" direction="row" spacing={0.5}>
              <Typography
                variant="body2"
                className="cursor-pointer"
                component="div"
                onClick={() => {
                  navigate('/page/Test-Page');
                }}
                sx={{
                  '&:hover': {
                    color: '#fff'
                  }
                }}
              >
                Pages
              </Typography>
              <Typography variant="body2">{'>'}</Typography>
              <Typography variant="body2" className="cursor-pointer">
                Create a Page
              </Typography>
            </Stack>
            <Typography className="primary-text-color" variant="h3">
              Create a Page
            </Typography>
          </Stack>
          <IconButton>
            <HiInformationCircle />
          </IconButton>
        </Stack>
        {/* body */}
        <Stack direction="column" spacing={2} className="body-container">
          <Typography className="primary-text-color">Page Information</Typography>
          <Stack spacing={0.5}>
            <TextField
              placeholder="Page name (required)"
              {...register('page_name', { required: 'Please enter page name !' })}
              helperText={errors.page_name?.message}
              error={!!errors?.page_name}
            />
            <Typography variant="caption" className="secondary-text-color">
              Use the name of your business, brand or organisation, or a name that explains what the
              Page is about.
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Controller
              name="category"
              control={control}
              rules={{
                required: 'Please select category!'
              }}
              render={({ field, fieldState }) => {
                return (
                  <Autocomplete
                    {...field}
                    options={['Subscription', 'Event']}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Choose a category"
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                );
              }}
            />
            <Typography variant="caption" className="secondary-text-color">
              Enter a category that describes what type of business, organisation or topic the Page
              represents.
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <TextField
              placeholder="Enter Description About a Page"
              InputProps={{
                inputComponent: TextareaAutosize
              }}
              inputProps={{
                minRows: 5
              }}
              {...register('description')}
            />
            <Typography variant="caption" className="secondary-text-color">
              Write about what your business does, the services that you provide or the purpose of
              the Page.
            </Typography>
          </Stack>
          {isPageCreated ? (
            <>
              <Typography className="primary-text-color">Images</Typography>
              <Stack spacing={0.5}>
                <Typography variant="caption" className="secondary-text-color fw-bold">
                  Profile Photo (Optional)
                </Typography>
                <CoverProfileDropzone
                  title="Add Profile Picture"
                  setUploadedImage={setUploadedProfilePicture}
                />
                <Typography variant="caption" className="secondary-text-color">
                  Use a logo or image that helps people identify this Page in search results.
                </Typography>
              </Stack>
              <Stack spacing={0.5}>
                <Typography variant="caption" className="secondary-text-color fw-bold">
                  Cover Photo (Optional)
                </Typography>
                <CoverProfileDropzone
                  title="Add Cover Photo"
                  setUploadedImage={setUploadedCoverPicture}
                />
                <Typography variant="caption" className="secondary-text-color">
                  Use an image that represents what this Page is about.
                </Typography>
              </Stack>
            </>
          ) : null}
        </Stack>
        {/* footer */}
        <Stack spacing={0.5} className="footer-container">
          <Typography variant="caption" className="secondary-text-color">
            You can add images, contact info and other details after you create the Page.
          </Typography>
          <LoadingButton variant="contained" type="submit">
            {isPageCreated ? 'Save' : 'Create Page'}
          </LoadingButton>
        </Stack>
      </form>

      {/* right side preview section */}
      <Box
        className="right-side-preview-container"
        sx={window.innerWidth < 1000 ? { display: 'none !important' } : {}}
      >
        <Box className="preview-section">
          {/* preview header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="preview-header"
          >
            <Typography className="primary-text-color">Preview</Typography>
          </Stack>
          {/* preview body */}
          <Stack direction="column" className="preview-body">
            {/* page-profile-section */}
            <Box className="page-profile-section">
              <Box
                className="cover-photo-container"
                sx={{
                  backgroundImage: `url(${uploadedCoverPicture[0]?.preview || coverPhoto})`
                }}
              />

              <Grid container sx={{ p: 1 }}>
                <Grid item sm={12} md={4} lg={2}>
                  <Avatar
                    sx={{ width: 88, height: 88, mt: -2.5 }}
                    src={uploadedProfilePicture[0]?.preview}
                  />
                </Grid>
                <Grid item sm={12} md={8} lg={9}>
                  <Stack direction="column">
                    <Typography variant="h2" className="primary-text-color">
                      {watchAllFields.page_name || 'Page name'}
                    </Typography>
                    <Typography variant="body1" className="secondary-text-color">
                      {watchAllFields.category || 'Category'}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ p: 1 }}>
                <Typography className="secondary-text-color" variant="body2">
                  Home
                </Typography>
                <Typography className="secondary-text-color" variant="body2">
                  About
                </Typography>
                <Typography className="secondary-text-color" variant="body2">
                  Photos
                </Typography>
                <Typography className="secondary-text-color" variant="body2">
                  Videos
                </Typography>
                {/* <Typography className="secondary-text-color" variant="body2">
                  More
                </Typography> */}
              </Stack>
            </Box>
            {/* Tabs body container */}
            <Box className="tab-body">
              <Grid container spacing={2}>
                <Grid item sm={12} md={5} lg={5}>
                  <Card className="info-cards">
                    <Stack className="card-header">
                      <Typography>About</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <HiInformationCircle />
                      <Typography variant="body2" className="text-break">
                        {watchAllFields.description || 'Description ...'}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item sm={12} md={7} lg={7}>
                  <Card className="info-cards">
                    <Stack className="card-header" direction="row" alignItems="center" spacing={1}>
                      <Avatar />
                      <Button variant="contained" fullWidth>
                        Create Post
                      </Button>
                    </Stack>
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={4} lg={4}>
                        <Typography variant="body2">Photo/video</Typography>
                      </Grid>
                      <Grid item sm={12} md={4} lg={4}>
                        <Typography variant="body2">Tag people</Typography>
                      </Grid>
                      <Grid item sm={12} md={4} lg={4}>
                        <Typography variant="body2">Check In</Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default CreatePage;
