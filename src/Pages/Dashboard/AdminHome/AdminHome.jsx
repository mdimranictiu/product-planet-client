import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthProvider';
import UseAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';
import { MdPending } from 'react-icons/md';
import { FaBox, FaCheckCircle, FaUsers } from 'react-icons/fa';
import useWebUsers from '../../../hook/useWebUsers';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const axiosSecure = UseAxiosSecure();
  const [accepted, setAccepted] = useState(0);
  const [pending, setPending] = useState(0);
  const [users, setUsers] = useWebUsers();

  useEffect(() => {
    axiosSecure
      .get('/allProducts')
      .then((res) => {
        setProducts(res.data);
        const acceptedProducts = res.data?.filter((product) => product.status === 'Accepted');
        const pendingProducts = res.data?.filter((product) => product.status === 'pending');
        setAccepted(acceptedProducts.length || 0);
        setPending(pendingProducts.length || 0);
      })
      .catch((error) => {
        console.error('Error fetching products:', error.message);
      });
  }, [axiosSecure]);

  const data = [
    { name: 'Total Users', value: users?.length || 0 },
    { name: 'Total Products', value: products?.length || 0 },
    { name: 'Accepted Products', value: accepted || 0 },
    { name: 'Pending Products', value: pending || 0 },
  ];

  const COLORS = ['#059669', '#0D9488', '#3B82F6', '#FB923C'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-[#111827] min-h-screen">
      <div className="p-16 max-sm:p-5">
        <h2 className="text-2xl font-bold text-white">Welcome back, {user?.displayName || 'Admin'}!</h2>
        <div className="my-10">
          <div className="grid text-center grid-cols-3 px-10 py-10 max-sm:px-2 max-sm:py-5 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            <div className="h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#059669] ">
              <FaUsers className="text-4xl" />
              <h2 className="text-2xl font-bold">Total Users</h2>
              <span className="text-2xl font-bold">{users?.length || 0}</span>
            </div>
            <div className="h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#0D9488] ">
              <FaBox className="text-4xl" />
              <h2 className="text-2xl font-bold">All Products</h2>
              <span className="text-2xl font-bold">{products?.length || 0}</span>
            </div>
            <div className="h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#3B82F6] ">
              <FaCheckCircle className="text-4xl" />
              <h2 className="text-2xl font-bold">Accepted Products</h2>
              <span className="text-2xl font-bold">{accepted || 0}</span>
            </div>
            <div className="h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#FB923C] ">
              <MdPending className="text-4xl" />
              <h2 className="text-2xl font-bold">Pending Products</h2>
              <span className="text-2xl font-bold">{pending || 0}</span>
            </div>
          </div>
        </div>
        <h2 className="text-center py-5 text-3xl font-bold">Overview of Data in Chart</h2>
        <div className="h-[700px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={170}
                // innerRadius={}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
