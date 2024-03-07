import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  width: ${3.5 * 79}px;
  height: ${3 * 79}px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.3 * 79px;
  background-color: linear-gradient(45deg, grey 0%, lightgray 100%);
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.6);
  border-right-width: 1px;
  border-right-color: rgba(255, 255, 255, 0.6);
  border-left-width: 1px;
  border-left-color: rgba(0, 0, 0, 0.4);
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
`;

export const Reel = styled.View`
  position: relative;
  width: 79px;
  height: ${3 * 79}px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  overflow: hidden;
  background-color: transparent;
`;

export const DebugText = styled.Text`
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px;
  background-color: white;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.3);
  font-family: monospace;
  font-size: 16px;
`;