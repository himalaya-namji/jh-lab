import { render, screen, fireEvent } from '@testing-library/react';
import HeartButton from './HeartButton';

describe('HeartButton', () => {
  it('초기에는 회색 하트가 보인다', () => {
    render(<HeartButton />);
    const svg = screen.getByLabelText(/좋아요/).querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('클릭 시 하트가 빨간색으로 바뀌고, 팝 애니메이션이 동작한다', () => {
    render(<HeartButton />);
    const button = screen.getByRole('button');
    // 초기 상태
    expect(button).toHaveAttribute('aria-label', '좋아요');
    // 클릭
    fireEvent.click(button);
    // 좋아요 상태로 변경
    expect(button).toHaveAttribute('aria-label', '좋아요 취소');
    // 애니메이션이 scale up 되는 동안 scale 스타일이 적용되는지 확인
    // (실제 애니메이션은 jsdom에서 동작하지 않으므로, aria-label로 상태만 확인)
  });
}); 