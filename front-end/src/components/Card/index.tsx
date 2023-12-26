import { ReactElement, useEffect, useState } from 'react';
import { Card } from 'antd';
import "./styles.scss";

const { Meta } = Card;

interface Props {
  title: string, 
  description: string,
  image?: string,
}

export const CategoryCard = ({ title, description, image}: Props): ReactElement => {

  return <Card
  className='card'
    hoverable
    cover={<img alt="example" src={null ?? 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} />}
  >
    <Meta title={title} description={description} />
  </Card>
};
