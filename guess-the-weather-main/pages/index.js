import { useState } from 'react';
import { handleWeatherComparison, handlePostDataComparison } from '../lib/nadaPrograms';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f7fa;
  font-family: Arial, sans-serif;
`;

const SplitContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Column = styled.div`
  width: 45%;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #0070f3;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #005bb5;
  }
`;

const Error = styled.p`
  color: red;
`;

const Success = styled.p`
  color: green;
`;

const Result = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  text-align: left;
`;

const Alert = styled.div`
  padding: 10px;
  border: 1px solid red;
  border-radius: 5px;
  background-color: #f8d7da;
  color: #721c24;
  margin-bottom: 10px;
`;

const AlertTitle = styled.h4`
  margin: 0;
  font-weight: bold;
`;

const AlertDescription = styled.p`
  margin: 0;
`;

const Title = styled.h1`
  color: #0070f3;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

export default function InputComparisonApp() {
  const [weatherTemperatureGuess, setWeatherTemperatureGuess] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherResult, setWeatherResult] = useState('');
  const [weatherError, setWeatherError] = useState(null);

  const [nadaTemperatureGuess, setNadaTemperatureGuess] = useState('');
  const [postData, setPostData] = useState(null);
  const [postResult, setPostResult] = useState('');
  const [postError, setPostError] = useState(null);

  const handleWeatherSubmit = async (e) => {
    e.preventDefault();
    const weatherCity = 'Goa';
    try {
      const { actualTemperature, result } = await handleWeatherComparison(weatherCity, weatherTemperatureGuess);
      setWeatherData({ current: { temp_c: actualTemperature } });
      setWeatherResult(result);
      setWeatherError(null);
    } catch (error) {
      setWeatherError(error.message);
      setWeatherData(null);
      setWeatherResult('');
    }
  };

  const handlePostDataSubmit = async (e) => {
    e.preventDefault();
    try {
      const { postData, result } = await handlePostDataComparison(nadaTemperatureGuess);
      setPostData(postData);
      setPostResult(result);
      setPostError(null);
    } catch (error) {
      setPostError(error.message);
      setPostData(null);
      setPostResult('');
    }
  };

  return (
    <Container>
      <SplitContainer>
        <Column>
          <Title>Weather Guessing App</Title>
          <Form onSubmit={handleWeatherSubmit}>
            <p>City Name: Goa</p>
            <Label>Guess Tomorrow's Temperature (°C):</Label>
            <StyledInput
              type="number"
              value={weatherTemperatureGuess}
              onChange={(e) => setWeatherTemperatureGuess(e.target.value)}
              required
            />
            <StyledButton type="submit">Submit Guess</StyledButton>
          </Form>

          {weatherError && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{weatherError}</AlertDescription>
            </Alert>
          )}
          {weatherData && (
            <Result>
              <h2>Weather in Goa</h2>
              <p>Current Temperature: {weatherData.current.temp_c} °C</p>
              <p className={weatherResult === 'Correct Guess!' ? Success : Error}>{weatherResult}</p>
            </Result>
          )}
        </Column>

        <Column>
          <Title>Weather Nada App</Title>
          <Form onSubmit={handlePostDataSubmit}>
            <p>City Name: Goa</p>
            <Label>Guess Tomorrow's Temperature (°F):</Label>
            <StyledInput
              type="number"
              value={nadaTemperatureGuess}
              onChange={(e) => setNadaTemperatureGuess(e.target.value)}
              required
            />
            <StyledButton type="submit">Submit Guess</StyledButton>
          </Form>

          {postError && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{postError}</AlertDescription>
            </Alert>
          )}
          {postData && (
            <Result>
              <h2>Weather in Goa</h2>
              <p>Current Temperature: {postData} °F</p>
              <p className={postResult === 'Correct Guess!' ? Success : Error}>{postResult}</p>
            </Result>
          )}
        </Column>
      </SplitContainer>
    </Container>
  );
}